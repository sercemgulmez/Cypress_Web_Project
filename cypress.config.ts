import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/json',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://www.trendyol.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    viewportWidth: 1440,
    viewportHeight: 900,
    retries: {
      runMode: 1,
      openMode: 0
    },
    allowCypressEnv: false,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: true,
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
  }
});
