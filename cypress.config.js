const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.js",
    baseUrl: "https://reqres.in",
    "retries": 0,
    "video": true,
    "screenshotsFolder": "cypress/screenshots",
    "videosFolder": "cypress/videos",
    "reporter": "junit",
    "reporterOptions": {
      "mochaFile": "cypress/results/results-[hash].xml",
      "toConsole": true
    }
  },
});
