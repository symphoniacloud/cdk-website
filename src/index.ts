import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, Function, FunctionCode, FunctionEventType, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, BucketEncryption, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { AddBehaviorOptions } from 'aws-cdk-lib/aws-cloudfront/lib/distribution';

export interface WebsiteProps {
    readonly customDomain?: WebsiteCustomDomain;
    readonly content?: WebsiteContent; // if null don't deploy
    readonly preProcessFunctionCode?: WebsitePreProcessFunctionCode;
    readonly additionalDefaultBehaviorOptions?: AddBehaviorOptions;
}

export interface WebsiteCustomDomain {
    readonly domainName: string;
    readonly certificate: WebsiteCertificate;
    readonly hostedZone?: WebsiteHostedZone;

    // TODO - allow additional domain names - requires updates for DNS registration too
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

        if (props.customDomain && props.customDomain.hostedZone) {
            const zone = isHostedZoneFromDomainName(props.customDomain.hostedZone)
                ? HostedZone.fromLookup(this, 'zone', { domainName: props.customDomain.hostedZone.fromDomainName })
                : props.customDomain.hostedZone;

            new ARecord(this, 'DnsRecord', {
                zone,
                recordName: props.customDomain.domainName,
                target: RecordTarget.fromAlias(new CloudFrontTarget(this.cloudFront)),
            });
        }

        if (props.content) {
            this.bucketDeployment = new BucketDeployment(this, 'Deploy', {
                sources: [Source.asset(props.content.path)],
                destinationBucket: this.siteBucket,
                ...props.content.performCacheInvalidation ? { distribution: this.cloudFront } : {},
            });
        }
    }
}

function customDomainElements(scope: Construct, props: WebsiteProps) {
    if (props.customDomain) {
        return {
            domainNames: [props.customDomain.domainName],
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

function functionAssociations(scope: Construct, props: WebsiteProps) {
    if (!props.preProcessFunctionCode) {
        return {};
    }

    const functionCode = isPreProcessFunctionCodeFromPath(props.preProcessFunctionCode)
        ? FunctionCode.fromFile({ filePath: props.preProcessFunctionCode.fromPath })
        : props.preProcessFunctionCode;

    return {
        functionAssociations: [
            {
                eventType: FunctionEventType.VIEWER_REQUEST,
                function: new Function(scope, 'PreProcessFunction', { code: functionCode }),
            },
        ],
    };
}

// Type guards

export function isCertificateFromArn(certificate: WebsiteCertificate): certificate is CertificateFromArn {
    return (certificate as CertificateFromArn).fromArn !== undefined;
}

export function isHostedZoneFromDomainName(hostedZone: WebsiteHostedZone): hostedZone is HostedZoneFromDomainName {
    return (hostedZone as HostedZoneFromDomainName).fromDomainName !== undefined;
}

export function isPreProcessFunctionCodeFromPath(functionCode: WebsitePreProcessFunctionCode): functionCode is WebsitePreProcessFunctionCodeFromPath {
    return (functionCode as WebsitePreProcessFunctionCodeFromPath).fromPath !== undefined;
}
