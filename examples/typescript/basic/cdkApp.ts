#!/usr/bin/env node
import 'source-map-support/register';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Website} from "@symphoniacloud/cdk-website";

class BasicExampleWebsiteStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        new Website(this, 'website')
    }
}

const app = new App();

new BasicExampleWebsiteStack(app, 'BasicExampleWebsite', {
    env: {account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION},
    stackName: app.node.tryGetContext('stackName') || 'basic-example-website'
})