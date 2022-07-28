# Basic example, in TypeScript

See overall documentation in the [repo README](../../../README.md).

This example deploys a very basic, publicly accessible, website. It has no custom domain name, nor
does it upload content (see the other examples for adding that behavior).

## To Deploy

**This will use the default AWS profile in your shell - make sure that is setup correctly first.**

To create a stack with the default stack name (`basic-example-website`), run:

```shell
npm install && npm run deploy
```

And then wait a few minutes - CloudFront takes a while to deploy.

Assuming the deploy process is successful you will be able to find a new stack in CloudFormation (
named `basic-example-website`), a new CloudFront distribution, and a new S3 bucket. Upload files to the S3 bucket, and
they will appear under the CloudFront-provided URL.

If you want to deploy content during the deployment process, or want to use a custom domain name, then see the other examples.

## Cleanup

To cleanup, delete the CloudFormation stack in CloudFormation, or with `cdk destroy` . **NB:** this **will not** delete the S3 bucket in the stack, so you should delete that manually.