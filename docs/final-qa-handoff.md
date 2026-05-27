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

## Next Steps

- Add accessibility smoke checks with an approved tool.
- Add visual checks in a controlled environment.
- Replace flexible selectors with first-party test IDs if available.
- Add CI workflow once execution cadence is agreed.
