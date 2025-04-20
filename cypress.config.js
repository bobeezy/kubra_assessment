const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllVideos: true,
      videoOnFailOnly: true,
      videoUploadOnPass: false
    },
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true
  },
}) 