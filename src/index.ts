import {Certificate, ICertificate} from 'aws-cdk-lib/aws-certificatemanager';
import {
    Distribution,
    Function,
    FunctionCode,
    FunctionEventType, IDistribution,
    ViewerProtocolPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import {S3Origin} from 'aws-cdk-lib/aws-cloudfront-origins';
import {ARecord, HostedZone, IHostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53';
import {CloudFrontTarget} from 'aws-cdk-lib/aws-route53-targets';
import {BlockPublicAccess, Bucket, BucketEncryption, ObjectOwnership} from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
import {AddBehaviorOptions} from 'aws-cdk-lib/aws-cloudfront/lib/distribution';

export interface WebsiteProps {
    readonly customDomain?: WebsiteCustomDomain;
    readonly content?: WebsiteContent; // if null don't deploy
    readonly preProcessFunctionCode?: WebsitePreProcessFunctionCode;
    readonly additionalDefaultBehaviorOptions?: AddBehaviorOptions;
}

export type WebsiteCustomDomain = WebsiteSingleCustomDomain | WebsiteMultipleCustomDomains

export interface WebsiteSingleCustomDomain extends DomainDNSDetails {
    readonly certificate: WebsiteCertificate;
}

export interface WebsiteMultipleCustomDomains {
    readonly certificate: WebsiteCertificate;
    readonly domains: DomainDNSDetails[]
}

export interface DomainDNSDetails {
    readonly domainName: string;
    readonly hostedZone?: WebsiteHostedZone;
}

export interface CertificateFromArn {
    readonly fromArn: string;
}

export type WebsiteCertificate = CertificateFromArn | ICertificate

export interface HostedZoneFromDomainName {
    readonly fromDomainName: string;
}

export type WebsiteHostedZone = HostedZoneFromDomainName | IHostedZone

export interface WebsitePreProcessFunctionCodeFromPath {
    readonly fromPath: string;
}

export type WebsitePreProcessFunctionCode = WebsitePreProcessFunctionCodeFromPath | FunctionCode

export interface WebsiteContent {
    readonly path: string;
    readonly performCacheInvalidation?: boolean;
}

export class Website extends Construct {
    readonly siteBucket: Bucket;
    readonly cloudFront: Distribution;
    readonly bucketDeployment?: BucketDeployment;

    constructor(scope: Construct, id: string, props: WebsiteProps = {}) {
        super(scope, id);

        this.siteBucket = new Bucket(this, 'SiteBucket', {
            encryption: BucketEncryption.S3_MANAGED,
            objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        });

        this.cloudFront = new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            ...customDomainElements(this, props),
            defaultBehavior: {
                origin: new S3Origin(this.siteBucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                ...functionAssociations(this, props),
                ...props.additionalDefaultBehaviorOptions,
            },
        });

        if (props.customDomain)
            setupDNS(this, props.customDomain, this.cloudFront)

        if (props.content) {
            this.bucketDeployment = new BucketDeployment(this, 'Deploy', {
                sources: [Source.asset(props.content.path)],
                destinationBucket: this.siteBucket,
                ...props.content.performCacheInvalidation ? {distribution: this.cloudFront} : {},
            });
        }
    }
}

function customDomainElements(scope: Construct, props: WebsiteProps) {
    if (props.customDomain) {
        return {
            domainNames: isWebsiteSingleCustomDomain(props.customDomain)
                ? [props.customDomain.domainName]
                : props.customDomain.domains.map(({domainName}) => domainName),
            certificate: calculateCertificate(scope, props.customDomain.certificate),
        };
    }

    return {};
}

function calculateCertificate(scope: Construct, certificate: { fromArn: string } | ICertificate): ICertificate {
    if (isCertificateFromArn(certificate)) {
        return Certificate.fromCertificateArn(scope, 'cert', certificate.fromArn);
    } else {
        return certificate;
    }
}

function setupDNS(scope: Construct, customDomain: WebsiteCustomDomain, distribution: IDistribution) {
    if (isWebsiteSingleCustomDomain(customDomain))
        setupDNSForSingleDomain(scope, customDomain, distribution)
    else
        customDomain.domains.forEach((domain: DomainDNSDetails, index: number) => {
            setupDNSForSingleDomain(scope, domain, distribution, `-${index}`)
        })
}

function setupDNSForSingleDomain(scope: Construct, customDomain: DomainDNSDetails, distribution: IDistribution, idSuffix = '') {
    if (customDomain.hostedZone) {
        const zone = isHostedZoneFromDomainName(customDomain.hostedZone)
            ? HostedZone.fromLookup(scope, `zone${idSuffix}`, {domainName: customDomain.hostedZone.fromDomainName})
            : customDomain.hostedZone;

        new ARecord(scope, `DnsRecord${idSuffix}`, {
            zone,
            recordName: customDomain.domainName,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        });
    }
}

function functionAssociations(scope: Construct, props: WebsiteProps) {
    if (!props.preProcessFunctionCode) {
        return {};
    }

    const functionCode = isPreProcessFunctionCodeFromPath(props.preProcessFunctionCode)
        ? FunctionCode.fromFile({filePath: props.preProcessFunctionCode.fromPath})
        : props.preProcessFunctionCode;

    return {
        functionAssociations: [
            {
                eventType: FunctionEventType.VIEWER_REQUEST,
                function: new Function(scope, 'PreProcessFunction', {code: functionCode}),
            },
        ],
    };
}

// Type guards

export function isCertificateFromArn(certificate: WebsiteCertificate): certificate is CertificateFromArn {
    return (certificate as CertificateFromArn).fromArn !== undefined;
}

export function isWebsiteSingleCustomDomain(customDomain: WebsiteCustomDomain): customDomain is WebsiteSingleCustomDomain {
    return (customDomain as WebsiteSingleCustomDomain).domainName !== undefined
}

export function isHostedZoneFromDomainName(hostedZone: WebsiteHostedZone): hostedZone is HostedZoneFromDomainName {
    return (hostedZone as HostedZoneFromDomainName).fromDomainName !== undefined;
}

export function isPreProcessFunctionCodeFromPath(functionCode: WebsitePreProcessFunctionCode): functionCode is WebsitePreProcessFunctionCodeFromPath {
    return (functionCode as WebsitePreProcessFunctionCodeFromPath).fromPath !== undefined;
}
