// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for an element to be visible
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
    cy.get(selector, { timeout }).should('be.visible')
})

// Custom command to check if an element exists
Cypress.Commands.add('elementExists', (selector) => {
    return cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
            return true
        }
        return false
    })
})

// Custom command to get table data
Cypress.Commands.add('getTableData', (tableSelector) => {
    return cy.getTable(tableSelector)
})

// Custom command to check if text is present on the page
Cypress.Commands.add('textShouldExist', (text) => {
    cy.contains(text).should('exist')
})

// Custom command to check if text is not present on the page
Cypress.Commands.add('textShouldNotExist', (text) => {
    cy.contains(text).should('not.exist')
}) 