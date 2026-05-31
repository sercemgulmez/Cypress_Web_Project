# Cypress QA Automation Framework — Public E-commerce Web Flows

## Portfolio Summary

This project demonstrates a production-safe Cypress + TypeScript QA automation framework for public e-commerce web flows. It covers risk-based test planning, safe automation boundary design, fake test data strategy, Page Object architecture, and an agent-assisted QA workflow mindset — where a coding agent supports planning, generation, and review while the QA engineer owns final safety decisions.

> **Disclaimer:** This is an independent QA automation portfolio project. It uses only public, safe, and repeatable flows on a publicly accessible e-commerce site. It is not affiliated with Trendyol or any other brand mentioned in the project. No real accounts, orders, payments, or personal data are used.

---

## What This Project Demonstrates

- **Risk-based QA planning** — Identifying which flows are safe to automate vs. manual-only
- **Production-safe automation** — Read-only public smoke and regression checks with no account state changes
- **Manual-only boundary design** — Documenting and halting at security, auth, and checkout walls
- **Fake data strategy** — Using synthetic inputs for boundary validation without real user data
- **Page Object architecture** — Resilient selector candidates instead of brittle single selectors
- **Agent-assisted QA workflow** — Coding agent supports scaffolding, review, and documentation; QA engineer owns safety decisions

---

## Tech Stack

- **Cypress** (v15) + **TypeScript**
- **Node.js**
- **Page Object / App Actions** pattern
- **cypress-axe** for accessibility smoke
- **@cypress/grep** for tag-based test filtering
- **Mochawesome** for HTML/JSON reporting

---

## Project Structure

```text
.
├── cypress/
│   ├── e2e/          # 17 spec files covering public flows
│   ├── pages/        # Page Object classes (extend BasePage)
│   ├── fixtures/     # Shared fake test data (test-data.json)
│   └── support/      # Custom cy.* commands, constants, type declarations
├── docs/             # QA strategy, risk matrix, execution results, manual boundaries
├── cypress.config.ts
├── package.json
└── tsconfig.json
```

---

## Installation

```bash
npm install
```

---

## Running Tests

```bash
npm test                  # headless run — all specs
npm run test:smoke        # homepage + search only
npm run test:chrome       # headless Chrome
npm run test:headed       # headed Electron
npm run test:open         # interactive Cypress UI
npm run cy:verify         # verify Cypress binary
```

Run a single spec:

```bash
npx cypress run --spec 'cypress/e2e/homepage.cy.ts'
```

Run by tag:

```bash
npm run test:tag -- @smoke
```

---

## Reporting

```bash
npm run report:full       # run tests → merge JSON reports → generate HTML report
npm run report:merge      # merge existing JSON reports only
npm run report:generate   # generate HTML from merged JSON
```

Reports output to `cypress/reports/html/`.

---

## Manual-Only Boundaries

The following flows are **intentionally excluded from automation**. They require real account state, financial transactions, or security controls that must not be bypassed on a production site.

| Area | Automation Decision |
|---|---|
| Login submission | Manual-only |
| Registration / account creation | Manual-only |
| OTP / SMS verification | Manual-only — never bypass |
| CAPTCHA / anti-bot challenges | Manual-only — never bypass |
| Checkout | Manual-only |
| Payment / card entry | Manual-only |
| Identity verification | Manual-only |
| Real order placement | Manual-only |
| Account-specific pages | Manual-only unless controlled test account exists |
| Real address or phone entry | Manual-only |

These boundaries are enforced at runtime: every page object checks `BOUNDARY_PATTERN` before interacting, and the suite stops and logs if a boundary page is detected.

---

## Architecture

### BasePage

All page objects extend `BasePage`. Key methods:

- `assertVisibleByCandidates(candidates)` — passes if any ranked CSS selector or RegExp text pattern matches. The primary assertion method for resilient testing against a site with no stable `data-testid` attributes.
- `safeClickIfVisible()` — clicks only if no boundary keyword is detected on the page.
- `firstVisible(selectors[])` — returns the first visible DOM match from an ordered list.
- `assertNoUnsafePage()` — asserts URL is not a checkout or payment path.

### Custom Commands (`cypress/support/commands.ts`)

- `cy.safeVisit(path)` — `cy.visit` with `failOnStatusCode:false`, auto-handles cookie banner, asserts no unsafe redirect.
- `cy.handleCookieBannerSafely()` — dismisses cookie consent banners silently.
- `cy.detectManualBoundary()` — returns `true` if the page body matches any boundary keyword.
- `cy.assertNoRealSubmission()` — asserts `location.href` is not a checkout or payment URL.

Uncaught exceptions from third-party scripts are globally suppressed in `e2e.ts` to prevent production noise from failing tests.

---

## Production Safety Rules

These are non-negotiable constraints, not style preferences:

- Never submit login, registration, or any form that creates account state.
- Never enter real address, phone, card, or payment data.
- Never bypass CAPTCHA, OTP, SMS, Cloudflare, or anti-bot controls — document as manual-only.
- Stop and log any test that reaches a boundary page; do not attempt to work around it.

---

## Known Limitations

- Public production pages may change selectors or content without notice.
- Anti-bot or security behavior may limit automated execution at any time.
- Selectors are necessarily less stable than a first-party test environment with data attributes.
- Full regression, cart, and checkout coverage should be run against a staging environment with synthetic accounts and test payment methods.

---

## Agent-Assisted QA Workflow

This framework was developed with an agent-assisted QA workflow:

1. QA engineer defines scope, safety rules, and risk priority.
2. Coding agent scaffolds test architecture, page objects, and documentation.
3. QA engineer reviews selectors, boundaries, and production risk.
4. Tests are executed conservatively and failures reviewed honestly.
5. Security, checkout, payment, and account boundaries remain manual-only.

---

## Documentation

- [Test Strategy](docs/ecommerce-cypress-test-strategy.md)
- [Risk Matrix](docs/risk-matrix.md)
- [Site Area Model](docs/site-area-model.md)
- [Full Test Case Catalog](docs/full-test-case-catalog.md)
- [Automation Candidate Matrix](docs/automation-candidate-matrix.md)
- [Automation Strategy](docs/automation-strategy.md)
- [Smoke Suite](docs/smoke-suite.md)
- [Regression Suite](docs/regression-suite.md)
- [Manual Boundaries](docs/manual-boundaries.md)
- [Test Expansion Roadmap](docs/test-expansion-roadmap.md)
- [Final QA Handoff](docs/final-qa-handoff.md)
- [Final Execution Results](docs/final-execution-results.md)
- [GitHub Profile Setup](docs/github-profile-setup.md)
