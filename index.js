const core = require('@actions/core');
const converter = require('./converter');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const semver = core.getInput('semver', { required: true });
    const zero_pad = core.getInput('zero_pad') ? parseInt(core.getInput('zero_pad')) : 3;

    core.info(`Converting ${semver}...`);

    const result = converter(semver, zero_pad);

    core.debug(`Converted ${semver} to ${result}`);

    core.setOutput('integer', result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
