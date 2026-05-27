# Automation Strategy

## Cypress Architecture

The project uses Cypress with TypeScript and a Page Object/App Actions style layer under `cypress/pages`. Specs under `cypress/e2e` stay readable and delegate repeated interactions to page classes.

## Page Object/App Actions Approach

- `BasePage` contains shared safe navigation, cookie handling, boundary detection, text assertions, and safe click helpers.
- Feature page classes represent homepage, search, listing, product detail, login, cart, and footer/help flows.
- Page methods perform public actions only.

## Selector Strategy

- Prefer data attributes when available.
- Prefer semantic selectors and visible text over deeply nested CSS.
- Use flexible candidates for public pages that may change.
- Avoid XPath.
- Avoid hard waits.
- Avoid force-clicking unsafe controls.

## Fake Data Strategy

Only placeholder data is used:

- `Test User`
- `test@example.com`
- `invalid-email`
- `5000000000`
- `123`
- Search terms: `laptop`, `kulaklık`, `kitap`, `ayakkabı`

No real address, card, identity, or account data is used.

## Stability Rules

- Keep request volume low.
- Use smoke/regression checks rather than crawling.
- Do not bypass anti-bot controls.
- Treat CAPTCHA, OTP, payment, checkout, and identity prompts as manual-only.
- Record execution limits honestly.

## Reporting

Cypress screenshots are enabled on failure. Video is disabled for simplicity. Execution results are summarized in `docs/final-execution-results.md`.

## CI Suggestion

Run the smoke suite on a conservative schedule and keep full regression for staging/test environments. For production, avoid high parallelism and avoid retry storms.

## Public Production Testing Limitations

Public pages may change, personalize content, run A/B tests, or trigger security protections. These tests demonstrate QA architecture and safe public checks, not complete end-to-end purchase validation.
