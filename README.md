# Cypress Test Automation Project

This project contains automated tests for the Practice Test Automation website using Cypress framework with Mochawesome reporter.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Available Commands

### Running Tests

1. **Open Cypress Test Runner (Interactive Mode)**
```bash
npm run cypress:open
```
This command opens the Cypress Test Runner in interactive mode where you can:
- See all test files
- Run tests in the browser
- Watch test execution in real-time
- Debug tests
- View test results

2. **Run All Tests (Headless Mode)**
```bash
npm run cypress:run
```
This runs all tests in headless mode and generates reports.

3. **Run All Tests with Report Generation**
```bash
npm run test:report
```
This runs all tests and generates a Mochawesome HTML report.

4. **Run API Tests Only**
```bash
npm run test:api
```
This runs only the API tests and generates a report.

5. **Run Web Tests Only**
```bash
npm run test:web
```
This runs only the web tests and generates a report.

### Test Structure

- API Tests: `cypress/e2e/specs/api/`
- Web Tests: `cypress/e2e/specs/web/`
- Page Objects: `cypress/e2e/pages/`

### Reports

After running tests with report generation, you can find the reports in:
- HTML Report: `cypress/reports/mochawesome-report/mochawesome.html`
- JSON Report: `cypress/reports/mochawesome-report/mochawesome.json`

## Project Structure

```
cypress/
├── e2e/
│   ├── api/           # API test files
│   ├── web/           # Web test files
│   └── pages/         # Page Object Models
├── fixtures/          # Test data
├── support/           # Support files
└── reports/          # Test reports
```

## Best Practices

1. Use Page Object Model pattern for better maintainability
2. Keep tests independent and isolated
3. Use meaningful test descriptions
4. Follow the AAA (Arrange-Act-Assert) pattern in tests
5. Use custom commands for repeated operations

## Troubleshooting

If you encounter any issues:

1. Clear Cypress cache:
```bash
npx cypress cache clear
```

2. Delete the Cypress browser cache:
```bash
rm -rf ~/.cache/Cypress
```

3. Reinstall dependencies:
```bash
rm -rf node_modules
npm install
``` 