import config from '../config/config.json'

class LoginPage {
    // Selectors
    get usernameInput() { return '#username' }
    get passwordInput() { return '#password' }
    get submitButton() { return '#submit' }
    get successMessage() { return '.post-title' }

    // Actions
    visit() {
        cy.visit(`${config.baseUrl}${config.endpoints.login}`)
        return this
    }

    login(username = config.credentials.validUsername, password = config.credentials.validPassword) {
        if (username) {
            cy.get(this.usernameInput).type(username)
        }
        if (password) {
            cy.get(this.passwordInput).type(password)
        }
        cy.get(this.submitButton).click()
    }

    // Verification methods
    verifySuccessfulLogin() {
        cy.get(this.successMessage)
            .should('be.visible')
            .and('have.text', 'Logged In Successfully')
        return this
    }
}

export default new LoginPage() 