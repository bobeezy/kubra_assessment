import LoginPage from '../../pages/loginPage'
import config from '../../config/config.json'
import testData from '../../config/testData.json'

describe('Login Page Tests', () => {
    beforeEach(() => {
        LoginPage.visit()
    })

    it('should login successfully with valid credentials', () => {
        LoginPage.login()
        LoginPage.verifySuccessfulLogin()
    })

    it('should show error with invalid username', () => {
        LoginPage.login(
            testData.login.invalidCredentials.username,
            config.credentials.validPassword
        )
        cy.contains(testData.login.messages.invalidUsername).should('be.visible')
    })

    it('should show error with invalid password', () => {
        LoginPage.login(
            config.credentials.validUsername,
            testData.login.invalidCredentials.password
        )
        cy.contains(testData.login.messages.invalidPassword).should('be.visible')
    })

    it('should show error with empty credentials', () => {
        LoginPage.login(
            testData.login.emptyCredentials.username,
            testData.login.emptyCredentials.password
        )
        cy.contains(testData.login.messages.invalidUsername).should('be.visible')
    })
})
