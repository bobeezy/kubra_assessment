// Import commands.js using ES2015 syntax:
import './commands'

// Import plugins
import 'cypress-mochawesome-reporter/register'
import '@cypress/xpath'
import 'cypress-file-upload'
import 'cypress-plugin-api'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (app) {
    app.console.log = () => {};
}

// Prevent uncaught exception from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
}) 