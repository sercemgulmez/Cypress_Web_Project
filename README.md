# Cypress Agentic QA Framework for Public E-commerce Web Flows

## Overview

This project demonstrates a Cypress-based QA automation framework for safe public e-commerce web flow testing. It is designed with an agent-assisted QA workflow in mind, where planning, generation, review, and healing can be supported by coding agents, while the QA engineer remains responsible for final review and safety decisions.

Target site: `https://www.trendyol.com/`

The suite focuses on public, repeatable, production-friendly smoke and regression checks. It does not attempt real customer actions.

## Why This Project Exists

This is a QA automation portfolio and learning project. It shows how to combine risk-based test planning, Cypress architecture, Page Object/App Actions style code, fake data, and manual-only boundary documentation for a large public e-commerce website.

## Tech Stack

- Cypress
- TypeScript
- Node.js
- Page Object/App Actions pattern
- Markdown documentation

## What This Project Demonstrates

- Risk-based QA planning
- Public e-commerce flow analysis
- Safe Cypress automation against production pages
- Search, listing, product detail, login boundary, cart boundary, footer/help, and mobile smoke coverage
- Fake data strategy
- Manual-only documentation for checkout, payment, login, OTP, CAPTCHA, and identity controls

## Production Safety Rules

- Do not login with real credentials.
- Do not create a real account.
- Do not submit registration forms.
- Do not complete checkout.
- Do not enter real address, phone, card, or payment data.
- Do not bypass CAPTCHA, OTP, SMS verification, identity checks, payment checks, or anti-bot controls.
- Stop and document any security boundary as manual-only.
- Keep execution limited to safe smoke/regression checks.

## Manual-Only Boundaries

The following areas are intentionally excluded from automation:

- Login submission
- Registration submission
- OTP/SMS verification
- CAPTCHA or anti-bot challenges
- Checkout
- Payment
- Identity verification
- Final order placement
- Account-specific pages

## Project Structure

```text
.
├── README.md
├── package.json
├── tsconfig.json
├── cypress.config.ts
├── cypress/
│   ├── e2e/
│   ├── pages/
│   ├── fixtures/
│   └── support/
└── docs/
```

## Installation

```bash
npm install
```

## Running Tests

```bash
npm test
npm run test:smoke
npm run test:chrome
npm run test:headed
npm run test:open
```

Verify Cypress:

```bash
npm run cy:verify
```

## Documentation

- [Test Strategy](docs/ecommerce-cypress-test-strategy.md)
- [Risk Matrix](docs/risk-matrix.md)
- [Smoke Suite](docs/smoke-suite.md)
- [Regression Suite](docs/regression-suite.md)
- [Manual Boundaries](docs/manual-boundaries.md)
- [Automation Strategy](docs/automation-strategy.md)
- [Final QA Handoff](docs/final-qa-handoff.md)
- [Final Execution Results](docs/final-execution-results.md)

## Agent-Assisted QA Workflow

This framework is suitable for an agent-assisted QA process:

1. A QA engineer defines scope, safety rules, and risk priority.
2. A coding agent helps scaffold test architecture and documentation.
3. The QA engineer reviews selectors, boundaries, and production risk.
4. Tests are executed conservatively.
5. Failures are reviewed honestly instead of bypassed.
6. Security, checkout, payment, and account boundaries remain manual-only.

## Known Limitations

- Public production pages may change without notice.
- Anti-bot or security behavior may limit automated execution.
- Selectors are necessarily less stable than a first-party test environment with data attributes.
- Full regression should be run against a staging or test environment where safe test accounts and test payment methods exist.

## Portfolio Value

This project demonstrates practical QA judgment, not just automation syntax. It shows how to decide what should be automated, what should remain manual, and how to document production-safe boundaries.

## Status

Framework scaffold complete. Execution results should be checked in `docs/final-execution-results.md` after each validation run.
