# Manual-Only Boundaries

The following flows are intentionally excluded from production automation.

| Boundary | Reason | Automation decision |
|---|---|---|
| Login | Requires credentials and may trigger security controls | Observe page only |
| Registration | Creates account state and may require personal data | Manual-only |
| OTP/SMS | Security verification | Manual-only, never bypass |
| CAPTCHA | Anti-bot protection | Manual-only, never bypass |
| Payment | Financial transaction risk | Manual-only in staging/test env |
| Checkout | Could create customer/order state | Manual-only in staging/test env |
| Identity verification | Sensitive user verification | Manual-only |
| Final order placement | Real business transaction | Manual-only |
| Account-specific flows | Requires authenticated user state | Manual-only unless controlled test account exists |

If any boundary appears during execution, the suite must stop before interacting with it and document the result honestly.
