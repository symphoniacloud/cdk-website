# CDK Construct for deploying a website

Deploying a "static" website on AWS is surprisingly tricky - managing S3, CloudFront, the security between them, Route 53, and more.
This constructs provides a higher level abstraction over all of these services to make life a little easier.

This construct can't support every use case - if it doesn't work for you feel free to grab the source and make your own version, or let me know if you have a suggestion!

## What it deploys

TODO - docs and diagrams

## Using cdk-website

This README assumes that you are already very familiar with deploying to AWS using CDK. Further the examples provided
are in TypeScript, but this construct can be used in (**TODO - list languages**).

### Getting started

To get started:

1 - Add the cdk-website library to your project dependencies
2 - In your application stack instantiate the construct, e.g. in TypeScript:

```typescript
new Website(this, 'website')
```

3 - Deploy

This will deploy an S3 bucket, and a CloudFront distribution that uses the S3 bucket as its origin. 

There is an example for this basic usage [here](examples/typescript/basic).

**TODO - more here...**