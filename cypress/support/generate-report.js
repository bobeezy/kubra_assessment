const { merge } = require('mochawesome-merge')
const reportGenerator = require('mochawesome-report-generator')
const path = require('path')
const fs = require('fs')

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, '../../cypress/reports')
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
}

// Generate report
async function generateReport() {
    try {
        // Merge all JSON reports
        const jsonReport = await merge({
            files: [path.join(reportsDir, '*.json')],
            reportDir: reportsDir
        })

        // Generate HTML report
        await reportGenerator.create(jsonReport, {
            reportDir: reportsDir,
            reportFilename: 'mochawesome-report',
            reportTitle: 'Cypress Test Report',
            reportPageTitle: 'Cypress Test Results',
            embeddedScreenshots: true,
            inlineAssets: true,
            saveAllVideos: true,
            videoOnFailOnly: true,
            videoUploadOnPass: false
        })

        console.log('Mochawesome report generated successfully!')
    } catch (error) {
        console.error('Error generating report:', error)
        process.exit(1)
    }
}

generateReport() 