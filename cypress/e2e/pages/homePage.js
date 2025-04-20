import testData from '../config/testData.json'

class HomePage {
    // Selectors
    get homeLink() { return '#menu-item-43' }
    // get homeLink() { return '//li[@id="menu-item-43"]/a[text()="Home"]' }
    // get homeLink() { return 'a[href="/practice-test-login/"]' }
    get welcomeMessage() { return 'p:has(strong:contains("Welcome to Practice Test Automation!"))' }

    // Actions
    clickHome() {
        cy.get(this.homeLink).click()
    }

    // Assertions
    verifyWelcomeMessage() {
        cy.get(this.welcomeMessage).should('exist')
    }
}

export default new HomePage()
