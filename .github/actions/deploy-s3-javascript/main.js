// import installed packages
const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
  // 1) get some input values
  const bucket = core.getInput('bucket', { required: true })
  const bucketRegion = core.getInput('bucket-region', { required: true })
  const distFolder = core.getInput('dist-folder', { required: true })
  
  // 2) upload files
  const s3Uri = `s3://${bucket}`                                            // back-ticks instead of quotes
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)   // AWS CLI is preinstalled on the Runner on ubuntu-latest 

  // github.getOctokit()...  // 
  // github.context...       // get context info e.g. action

  core.notice('Hello from my custom JavaScript Action!');

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  core.setOutput('website-url', websiteUrl);    // set the output-variable which is declared in the action

} 

run();