# Manual-Only Boundaries

The following flows are intentionally excluded from production automation.

Any test that reaches one of these boundaries must stop, log the result, and document it as manual-only. The framework must never attempt to bypass, work around, or simulate these controls.

| Boundary | Reason | Automation Decision |
|---|---|---|
| Login submission | Requires real credentials; may trigger security controls | Manual-only |
| Registration / account creation | Creates real account state; requires personal data | Manual-only |
| OTP / SMS verification | Security control — never bypass | Manual-only, never bypass |
| CAPTCHA / anti-bot challenges | Anti-bot protection — never bypass | Manual-only, never bypass |
| Checkout | Could create customer or order state | Manual-only (staging env only) |
| Payment / card entry | Financial transaction risk | Manual-only (staging env only) |
| Identity verification | Sensitive user verification | Manual-only |
| Real order placement | Creates a real business transaction | Manual-only |
| Real address entry | Sensitive personal data | Manual-only |
| Real phone number entry | Sensitive personal data | Manual-only |
| Account-specific pages | Requires authenticated user state | Manual-only unless controlled test account exists |
| Saved cards / saved addresses | Requires authenticated user state | Manual-only |
| Order history / tracking | Requires authenticated user state | Manual-only |
| Coupon / promotion redemption | May create real financial state | Manual-only |
| Any action that changes account or order state | Irreversible production side-effect | Manual-only |

---

## Runtime Enforcement

The `BOUNDARY_PATTERN` constant in `cypress/support/constants.ts` defines the keyword list used at runtime. Every page method in `BasePage` checks the page body against this pattern before interacting. If a boundary keyword is detected:

- The current test step is skipped.
- A `cy.log` entry is written noting the boundary.
- No further interaction is attempted.

This approach means the suite degrades gracefully when a production page introduces an unexpected auth or security wall, rather than failing with an uncaught error or, worse, accidentally interacting with a protected form.
