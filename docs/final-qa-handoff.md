# Final QA Handoff

## Files Created

- Cypress configuration and TypeScript setup
- Page Object/App Actions classes
- Public-flow Cypress specs
- Fake test data fixture
- Support commands
- Risk-based QA documentation
- Portfolio README

## How To Run

```bash
npm install
npm run cy:verify
npm test
```

For a smaller production-safe smoke run:

```bash
npm run test:smoke
```

## Safety Boundaries

The framework does not login, register, submit forms, checkout, pay, enter addresses, enter cards, or bypass CAPTCHA/OTP/security controls.

## Known Limitations

- Public production anti-bot behavior may limit execution.
- Dynamic selectors and page content may change.
- Full end-to-end commerce validation requires a staging/test environment.

## Current Coverage

- Accessibility smoke: `accessibility-smoke.cy.ts` and `axe-accessibility.cy.ts` (cypress-axe)
- Cross-viewport smoke: `cross-viewport.cy.ts`
- Brand page smoke: `brand-page.cy.ts`
- URL routing smoke: `url-routing.cy.ts`
- Wishlist boundary: `wishlist-boundary.cy.ts`
- Performance smoke: `performance-smoke.cy.ts`

## Next Steps

- Replace flexible selectors with first-party test IDs if available from the site owner.
- Extend coverage to a staging environment with synthetic accounts for login, cart, and checkout flows.
- Add visual regression checks in a controlled environment.
- Tune CI run frequency to avoid excessive public-site traffic.
