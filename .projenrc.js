const { awscdk } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Symphonia LLC',
  authorAddress: 'open-source@symphonia.io',
  description: 'Deploy an S3-backed website using CloudFront',
  cdkVersion: '2.30.0',
  defaultReleaseBranch: 'main',
  name: '@symphoniacloud/cdk-website',
  repositoryUrl: 'https://github.com/symphoniacloud/cdk-website.git',
  keywords: ['cloudfront', 's3', 'website', 'aws-cdk'],
  license: 'MIT',
  eslint: false,
  npmAccess: NpmAccess.PUBLIC,
  depsUpgrade: false

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();