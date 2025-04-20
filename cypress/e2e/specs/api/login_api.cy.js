import config from '../../config/config.json'
import testData from '../../config/testData.json'

describe('Login API Tests', () => {
    const baseUrl = config.baseUrl
    const loginEndpoint = config.endpoints.login

    it('should successfully login with valid credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            form: true,
            body: testData.login.validCredentials,
            followRedirect: true
        }).then((response) => {
            // Verify successful response
            expect(response.status).to.eq(200)

            // Validate the response time is within an acceptable range
            expect(response.duration).to.be.lessThan(4000);

            // Check if the response body contains success message
            expect(response.body).to.include(testData.login.messages.success)
        })
    })

    it('should fail login with invalid username', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            form: true,
            body: {
                username: testData.login.invalidCredentials.username,
                password: testData.login.validCredentials.password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include(testData.login.messages.invalidUsername)
        })
    })

    it('should fail login with invalid password', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            form: true,
            body: {
                username: testData.login.validCredentials.username,
                password: testData.login.invalidCredentials.password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include(testData.login.messages.invalidPassword)
        })
    })

    it('should handle empty credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            form: true,
            body: testData.login.emptyCredentials,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include(testData.login.messages.invalidUsername)
        })
    })

    it('should handle missing credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}${loginEndpoint}`,
            form: true,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include(testData.login.messages.invalidUsername)
        })
    })
})
