import HomePage from '../../pages/homePage'
import LoginPage from '../../pages/loginPage'
import config from '../../config/config.json'

describe('Home Page Tests', () => {
    beforeEach(() => {
        // Visit the login page first since we need to be logged in
        LoginPage.visit()
        LoginPage.login()
    })

    it('should navigate to home page and verify welcome message', () => {
        // Click on the home link
        HomePage.clickHome()

        // Verify the welcome message
        HomePage.verifyWelcomeMessage()
    })
})
