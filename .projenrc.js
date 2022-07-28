const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Symphonia',
  authorAddress: 'open-source@symphonia.io',
  description: 'Deploy an S3-backed website using CloudFront',
  cdkVersion: '2.30.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-website',
  repositoryUrl: 'https://github.com/symphoniacloud/cdk-website.git',
  authorOrganization: true,
  keywords: ['cloudfront', 's3', 'website', 'aws-cdk'],
  license: 'MIT',
  eslint: false,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();