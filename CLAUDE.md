# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install               # install dependencies

npm test                  # headless run (all specs)
npm run test:open         # interactive Cypress UI
npm run test:chrome       # headless Chrome
npm run test:headed       # headed Electron
npm run test:smoke        # homepage + search only
npm run cy:verify         # verify Cypress binary

npm run report:full       # run tests → merge JSON → generate HTML report
npm run report:merge      # merge existing JSON reports
npm run report:generate   # generate HTML from merged JSON
```

Run a single spec:
```bash
npx cypress run --spec 'cypress/e2e/homepage.cy.ts'
```

Run by tag (uses @cypress/grep):
```bash
npm run test:tag -- @smoke
npm run test:tag -- @boundary
```

## Architecture

**Target:** `https://www.trendyol.com` — a public production e-commerce site.  
Tests are **read-only public smoke/regression checks**. No real accounts, credentials, payments, or form submissions.

### Page Object layer (`cypress/pages/`)

All page objects extend `BasePage`. `BasePage` provides:
- `assertVisibleByCandidates(candidates)` — checks a ranked list of CSS selectors or RegExp text patterns and passes if any one matches. This is the primary assertion method for resilient public-page testing where selectors may change.
- `safeClickIfVisible()` — clicks only if no manual-boundary keyword is detected on the page.
- `firstVisible(selectors[])` — returns the first visible DOM match from an ordered list.
- `assertNoUnsafePage()` — delegates to `cy.assertNoRealSubmission()` (asserts URL is not a checkout/payment path).

Every page method checks `boundaryPattern` before any interaction to halt execution if a security/captcha/auth wall appears.

### Custom commands (`cypress/support/commands.ts`)

Four commands added to `cy.*`:
- `cy.safeVisit(path)` — `cy.visit` with `failOnStatusCode:false`, then auto-handles cookie banner and asserts no unsafe redirect.
- `cy.handleCookieBannerSafely()` — tries Turkish/English accept button labels, then close button selectors; silent if nothing found.
- `cy.detectManualBoundary()` — returns `boolean`; true if page body matches `boundaryPattern` (captcha, otp, sms, ödeme, checkout, login, etc.).
- `cy.assertNoRealSubmission()` — asserts `location.href` does not match checkout/payment URL patterns.

Uncaught exceptions from third-party scripts are globally suppressed in `e2e.ts` so production noise does not fail tests.

### Fixtures (`cypress/fixtures/test-data.json`)

Shared test data: safe search terms (Turkish + English product names), fake user data with invalid inputs for boundary tests, mobile viewport sizes, manual boundary keyword list, and expected public text signals.

### Production safety rules

These are non-negotiable constraints, not style preferences:
- Never submit login, registration, or any form that creates account state.
- Never enter real address, phone, card, or payment data.
- Never bypass CAPTCHA, OTP, SMS, Cloudflare, or anti-bot controls — document as manual-only instead.
- Stop and log any test that reaches a boundary page; do not attempt to work around it.

Automation is intentionally absent for: login submission, registration, OTP/SMS, checkout, payment, identity verification, account-specific pages.

### Selector strategy

Selectors are written as ranked candidate arrays (`assertVisibleByCandidates`) rather than single selectors, because the site does not expose stable `data-testid` attributes. Prefer RegExp text patterns as fallback candidates over brittle class names.
