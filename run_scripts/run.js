const cypress = require('cypress');
const fs_extra = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

const project = process.env.PROJECT;

const reportDir = `./results/${project}/reports`;

const mochawesome_options = {
    'timestamp': false,
    'reportDir': reportDir,
    'overwrite': false,
    'html': false,
    'json': true
};

const cypress_options = {
    config: {
        'fileServerFolder': `./source/${project}`,
        'fixturesFolder': `./source/${project}/cypress/fixtures`,
        'integrationFolder': `./source/${project}/cypress/integration`,
        'pluginsFile': `./source/${project}/cypress/plugins/index.js`,
        'supportFile': `./source/${project}/cypress/support/index.js`,
        'screenshotsFolder': `./results/${project}/screenshots`,
        'videosFolder': `./results/${project}/videos`,
        'video': false,
        'reporter': 'mochawesome',
        'reporterOptions': mochawesome_options
    },
    // spec: './source/foo/cypress/integration/examples/actions*.spec.js'
};

async function runTests() {
    try {
        await fs_extra.emptyDir(reportDir);
        await cypress.run(cypress_options);
        const jsonReport = await merge({ reportDir: reportDir });
        await generator.create(jsonReport, mochawesome_options);
    } catch (error) {
        console.error(error);
    } finally {
        process.exit(0);
    }
}

runTests();