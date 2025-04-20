import groovy.json.*

pipeline {
    agent any

    tools { 
        nodejs "nodejs18" // Using Node.js 18 which is compatible with Cypress
    }

    environment {
        // Define credentials as environment variables using Jenkins credentials
        CYPRESS_USERNAME = credentials('cypress-username')
        CYPRESS_PASSWORD = credentials('cypress-password')
        SLACK_TOKEN = credentials('slack-token')
    }

    parameters {
        choice(name: 'TEST_TYPE', choices: ['all', 'api', 'web'], description: 'Select which tests to run')
    }

    stages {
        stage('Test Slack Integration') {
            steps {
                script {
                    slackSend(channel: '#test-automation-alerts', color: 'good', message: "Starting Cypress test run for Practice Test Automation project.")
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Configuration') {
            steps {
                script {
                    // Remove old test artifacts
                    sh 'rm -rf cypress/reports cypress/videos cypress/screenshots'
                    
                    // Clean npm cache if needed
                    sh 'npm cache clean --force'
                    
                    // Create the config directory if it doesn't exist
                    sh 'mkdir -p cypress/e2e/config'
                    
                    // Create config.json with credentials from Jenkins
                    def config = [
                        baseUrl: 'https://practicetestautomation.com',
                        endpoints: [
                            login: '/practice-test-login/',
                            home: '/'
                        ],
                        credentials: [
                            validUsername: "${env.CYPRESS_USERNAME}",
                            validPassword: "${env.CYPRESS_PASSWORD}"
                        ]
                    ]
                    
                    // Write config as JSON to config.json
                    writeFile file: 'cypress/e2e/config/config.json', text: JsonOutput.toJson(config)
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'  // Use --legacy-peer-deps to resolve peer dependency conflicts
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    def testCommand = 'npx cypress run'
                    
                    // Add spec pattern based on test type parameter
                    if (params.TEST_TYPE == 'api') {
                        testCommand += ' --spec "cypress/e2e/specs/api/**/*.cy.js"'
                    } 
                    else if (params.TEST_TYPE == 'web') {
                        testCommand += ' --spec "cypress/e2e/specs/web/**/*.cy.js"'
                    }
                    
                    // Add reporter options
                    testCommand += ' --reporter cypress-mochawesome-reporter'
                    
                    // Execute the test command
                    sh testCommand
                }
            }
        }
        
        stage('Generate Report') {
            steps {
                sh 'npm run report'
            }
        }
    }

    post {
        always {
            // Clean up sensitive files
            sh 'rm -f cypress/e2e/config/config.json'
            
            // Publish test results
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'Cypress Test Report'
                // reportDir: 'cypress/reports/mochawesome-report',
                // reportFiles: 'mochawesome.html',
                // reportName: 'Cypress Test Report'
            ])
        }
        
        success {
            script {
                def reportPath = "${env.WORKSPACE}/cypress/reports/html/index.html" // Dynamic path
                if (fileExists(reportPath)) {
                    echo "Uploading report from ${reportPath} to Slack using webhook..."
                    
                    // Read the report content or generate a link to the report
                    def reportLink = "${env.BUILD_URL}artifact/cypress/reports/html/index.html" // Link to the report in Jenkins

                    // Prepare the payload for Slack
                    def payload = """
                    {
                        "text": "Mochawesome report for Build ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        "attachments": [
                            {
                                "title": "View Report",
                                "title_link": "${reportLink}",
                                "text": "The Mochawesome report has been generated. Click the link above to view it.",
                                "color": "#36a64f"
                            }
                        ]
                    }
                    """

                    // Send the payload to Slack using the webhook
                    sh """
                    curl -X POST -H 'Content-type: application/json' \
                         --data '${payload}' \
                         https://hooks.slack.com/services/T0SU4V03U/B08NHV9DS0K/ENCRYPTED_TOKEN
                    """
                } 
                else {
                    echo "Mochawesome report not found at ${reportPath}"
                }
            }
        }
        // success {
        //     // Send success notification
        //     slackSend(channel: '#test-automation-alerts', color: 'good', message: "Cypress tests for Kubra Test Automation project completed successfully.")
        //     // slackSend(channel: '#test-automation-alerts', color: 'good', message: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} succeeded.")

        //     // Upload Mochawesome report to Slack
        //     script {
        //         def reportPath = 'cypress/reports/mochawesome-report/mochawesome.html'
        //         if (fileExists(reportPath)) {
        //             slackUploadFile(
        //                 channel: '#test-automation-alerts',
        //                 filePath: reportPath,
        //                 initialComment: "Mochawesome report for Practice Test Automation project"
        //             )
        //         } 
        //         else {
        //             echo "Mochawesome report not found at ${reportPath}"
        //         }
        //     }
        // }
        
        failure {
            script {
                def reportPath = "${env.WORKSPACE}/cypress/reports/html/index.html" // Dynamic path
                def reportLink = "${env.BUILD_URL}artifact/cypress/reports/html/index.html" // Link to the report in Jenkins

                if (fileExists(reportPath)) {
                    echo "Uploading report from ${reportPath} to Slack..."
                    def result = sh(
                        script: """
                        curl -F file=@${reportPath} \
                            -F "initial_comment=Mochawesome report for Build ${env.JOB_NAME} #${env.BUILD_NUMBER}" \
                            -F channels=#test-automation-alerts \
                            -H "Authorization: Bearer ${env.SLACK_TOKEN}" \
                            https://slack.com/api/files.upload
                        """,
                        returnStatus: true
                    )
                    if (result == 0) {
                        echo "Report successfully uploaded to Slack."
                    } 
                    else {
                        echo "Failed to upload report to Slack. Curl exit code: ${result}"
                    }
                } 
                else {
                    echo "Mochawesome report not found at ${reportPath}"
                }

                // Send failure notification with a link to the report
                slackSend(
                    channel: '#test-automation-alerts',
                    color: 'danger',
                    message: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed. [View Mochawesome Report](${reportPath})"
                    // message: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed. [View Mochawesome Report](${reportLink})"
                )
            }
        }

        // failure {
        //     // Send failure notification
        //     slackSend(channel: '#test-automation-alerts', color: 'danger', message: "Cypress tests for Practice Test Automation project failed.")
        // }
    }
}
