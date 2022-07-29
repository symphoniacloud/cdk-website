# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Website <a name="Website" id="@symphoniacloud/cdk-website.Website"></a>

#### Initializers <a name="Initializers" id="@symphoniacloud/cdk-website.Website.Initializer"></a>

```typescript
import { Website } from '@symphoniacloud/cdk-website'

new Website(scope: Construct, id: string, props?: WebsiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.Website.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.Website.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.Website.Initializer.parameter.props">props</a></code> | <code><a href="#@symphoniacloud/cdk-website.WebsiteProps">WebsiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@symphoniacloud/cdk-website.Website.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@symphoniacloud/cdk-website.Website.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@symphoniacloud/cdk-website.Website.Initializer.parameter.props"></a>

- *Type:* <a href="#@symphoniacloud/cdk-website.WebsiteProps">WebsiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.Website.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@symphoniacloud/cdk-website.Website.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.Website.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@symphoniacloud/cdk-website.Website.isConstruct"></a>

```typescript
import { Website } from '@symphoniacloud/cdk-website'

Website.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@symphoniacloud/cdk-website.Website.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.Website.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@symphoniacloud/cdk-website.Website.property.cloudFront">cloudFront</a></code> | <code>aws-cdk-lib.aws_cloudfront.Distribution</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.Website.property.siteBucket">siteBucket</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.Website.property.bucketDeployment">bucketDeployment</a></code> | <code>aws-cdk-lib.aws_s3_deployment.BucketDeployment</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@symphoniacloud/cdk-website.Website.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudFront`<sup>Required</sup> <a name="cloudFront" id="@symphoniacloud/cdk-website.Website.property.cloudFront"></a>

```typescript
public readonly cloudFront: Distribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.Distribution

---

##### `siteBucket`<sup>Required</sup> <a name="siteBucket" id="@symphoniacloud/cdk-website.Website.property.siteBucket"></a>

```typescript
public readonly siteBucket: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `bucketDeployment`<sup>Optional</sup> <a name="bucketDeployment" id="@symphoniacloud/cdk-website.Website.property.bucketDeployment"></a>

```typescript
public readonly bucketDeployment: BucketDeployment;
```

- *Type:* aws-cdk-lib.aws_s3_deployment.BucketDeployment

---


## Structs <a name="Structs" id="Structs"></a>

### CertificateFromArn <a name="CertificateFromArn" id="@symphoniacloud/cdk-website.CertificateFromArn"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.CertificateFromArn.Initializer"></a>

```typescript
import { CertificateFromArn } from '@symphoniacloud/cdk-website'

const certificateFromArn: CertificateFromArn = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.CertificateFromArn.property.fromArn">fromArn</a></code> | <code>string</code> | *No description.* |

---

##### `fromArn`<sup>Required</sup> <a name="fromArn" id="@symphoniacloud/cdk-website.CertificateFromArn.property.fromArn"></a>

```typescript
public readonly fromArn: string;
```

- *Type:* string

---

### HostedZoneFromDomainName <a name="HostedZoneFromDomainName" id="@symphoniacloud/cdk-website.HostedZoneFromDomainName"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.HostedZoneFromDomainName.Initializer"></a>

```typescript
import { HostedZoneFromDomainName } from '@symphoniacloud/cdk-website'

const hostedZoneFromDomainName: HostedZoneFromDomainName = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.HostedZoneFromDomainName.property.fromDomainName">fromDomainName</a></code> | <code>string</code> | *No description.* |

---

##### `fromDomainName`<sup>Required</sup> <a name="fromDomainName" id="@symphoniacloud/cdk-website.HostedZoneFromDomainName.property.fromDomainName"></a>

```typescript
public readonly fromDomainName: string;
```

- *Type:* string

---

### WebsiteContent <a name="WebsiteContent" id="@symphoniacloud/cdk-website.WebsiteContent"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.WebsiteContent.Initializer"></a>

```typescript
import { WebsiteContent } from '@symphoniacloud/cdk-website'

const websiteContent: WebsiteContent = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteContent.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteContent.property.performCacheInvalidation">performCacheInvalidation</a></code> | <code>boolean</code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="@symphoniacloud/cdk-website.WebsiteContent.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `performCacheInvalidation`<sup>Optional</sup> <a name="performCacheInvalidation" id="@symphoniacloud/cdk-website.WebsiteContent.property.performCacheInvalidation"></a>

```typescript
public readonly performCacheInvalidation: boolean;
```

- *Type:* boolean

---

### WebsiteCustomDomain <a name="WebsiteCustomDomain" id="@symphoniacloud/cdk-website.WebsiteCustomDomain"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.WebsiteCustomDomain.Initializer"></a>

```typescript
import { WebsiteCustomDomain } from '@symphoniacloud/cdk-website'

const websiteCustomDomain: WebsiteCustomDomain = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteCustomDomain.property.certificate">certificate</a></code> | <code><a href="#@symphoniacloud/cdk-website.CertificateFromArn">CertificateFromArn</a> \| aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteCustomDomain.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteCustomDomain.property.hostedZone">hostedZone</a></code> | <code><a href="#@symphoniacloud/cdk-website.HostedZoneFromDomainName">HostedZoneFromDomainName</a> \| aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |

---

##### `certificate`<sup>Required</sup> <a name="certificate" id="@symphoniacloud/cdk-website.WebsiteCustomDomain.property.certificate"></a>

```typescript
public readonly certificate: CertificateFromArn | ICertificate;
```

- *Type:* <a href="#@symphoniacloud/cdk-website.CertificateFromArn">CertificateFromArn</a> | aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@symphoniacloud/cdk-website.WebsiteCustomDomain.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="@symphoniacloud/cdk-website.WebsiteCustomDomain.property.hostedZone"></a>

```typescript
public readonly hostedZone: HostedZoneFromDomainName | IHostedZone;
```

- *Type:* <a href="#@symphoniacloud/cdk-website.HostedZoneFromDomainName">HostedZoneFromDomainName</a> | aws-cdk-lib.aws_route53.IHostedZone

---

### WebsitePreProcessFunctionCodeFromPath <a name="WebsitePreProcessFunctionCodeFromPath" id="@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath.Initializer"></a>

```typescript
import { WebsitePreProcessFunctionCodeFromPath } from '@symphoniacloud/cdk-website'

const websitePreProcessFunctionCodeFromPath: WebsitePreProcessFunctionCodeFromPath = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath.property.fromPath">fromPath</a></code> | <code>string</code> | *No description.* |

---

##### `fromPath`<sup>Required</sup> <a name="fromPath" id="@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath.property.fromPath"></a>

```typescript
public readonly fromPath: string;
```

- *Type:* string

---

### WebsiteProps <a name="WebsiteProps" id="@symphoniacloud/cdk-website.WebsiteProps"></a>

#### Initializer <a name="Initializer" id="@symphoniacloud/cdk-website.WebsiteProps.Initializer"></a>

```typescript
import { WebsiteProps } from '@symphoniacloud/cdk-website'

const websiteProps: WebsiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteProps.property.additionalDefaultBehaviorOptions">additionalDefaultBehaviorOptions</a></code> | <code>aws-cdk-lib.aws_cloudfront.AddBehaviorOptions</code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteProps.property.content">content</a></code> | <code><a href="#@symphoniacloud/cdk-website.WebsiteContent">WebsiteContent</a></code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteProps.property.customDomain">customDomain</a></code> | <code><a href="#@symphoniacloud/cdk-website.WebsiteCustomDomain">WebsiteCustomDomain</a></code> | *No description.* |
| <code><a href="#@symphoniacloud/cdk-website.WebsiteProps.property.preProcessFunctionCode">preProcessFunctionCode</a></code> | <code><a href="#@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath">WebsitePreProcessFunctionCodeFromPath</a> \| aws-cdk-lib.aws_cloudfront.FunctionCode</code> | *No description.* |

---

##### `additionalDefaultBehaviorOptions`<sup>Optional</sup> <a name="additionalDefaultBehaviorOptions" id="@symphoniacloud/cdk-website.WebsiteProps.property.additionalDefaultBehaviorOptions"></a>

```typescript
public readonly additionalDefaultBehaviorOptions: AddBehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.AddBehaviorOptions

---

##### `content`<sup>Optional</sup> <a name="content" id="@symphoniacloud/cdk-website.WebsiteProps.property.content"></a>

```typescript
public readonly content: WebsiteContent;
```

- *Type:* <a href="#@symphoniacloud/cdk-website.WebsiteContent">WebsiteContent</a>

---

##### `customDomain`<sup>Optional</sup> <a name="customDomain" id="@symphoniacloud/cdk-website.WebsiteProps.property.customDomain"></a>

```typescript
public readonly customDomain: WebsiteCustomDomain;
```

- *Type:* <a href="#@symphoniacloud/cdk-website.WebsiteCustomDomain">WebsiteCustomDomain</a>

---

##### `preProcessFunctionCode`<sup>Optional</sup> <a name="preProcessFunctionCode" id="@symphoniacloud/cdk-website.WebsiteProps.property.preProcessFunctionCode"></a>

```typescript
public readonly preProcessFunctionCode: WebsitePreProcessFunctionCodeFromPath | FunctionCode;
```

- *Type:* <a href="#@symphoniacloud/cdk-website.WebsitePreProcessFunctionCodeFromPath">WebsitePreProcessFunctionCodeFromPath</a> | aws-cdk-lib.aws_cloudfront.FunctionCode

---



