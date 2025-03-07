import { defineConfig } from 'webdriverio';

export const config = defineConfig({
    runner: 'local',
    specs: ['./tests/specs/**/*.spec.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': { args: ['--headless', '--disable-gpu'] }
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    services: ['chromedriver'],
    mochaOpts: {
        timeout: 60000
    }
});
