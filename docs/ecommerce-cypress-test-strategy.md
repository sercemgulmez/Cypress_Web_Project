# E-commerce Cypress Test Strategy

## Scope

This strategy covers safe public web flows on a large-scale e-commerce website. The suite validates that public discovery paths are available without using real accounts or submitting customer actions.

## Goals

- Confirm homepage availability.
- Confirm search availability.
- Confirm listing and product detail visibility.
- Confirm major public CTA visibility without using it to purchase.
- Document login, cart, checkout, payment, OTP, CAPTCHA, and identity boundaries as manual-only.
- Provide a credible portfolio-ready Cypress structure.

## Public Website Safety Assumptions

- The target is a live production website.
- Tests must be respectful, low-volume, and repeatable.
- The suite must not bypass or weaken security controls.
- Dynamic content, A/B tests, cookies, and bot protections may affect results.

## Smoke Suite

- Homepage loads.
- Header, search, and footer signals are visible.
- Safe public search opens results.
- Product listing content is visible.
- Product detail opens from a listing.
- Login page boundary is visible without login.
- Cart/checkout boundary is observed without checkout.
- Mobile homepage and search are reachable.

## Regression Suite

Regression checks extend the smoke suite with listing filters/sorting, footer/help/legal links, product detail information, and boundary documentation.

## Negative Validation Boundaries

Invalid login, registration, payment, identity, and address validation are not automated against production. They require a controlled test environment.

## Mobile/Responsive Testing

Mobile smoke coverage uses Cypress viewport settings to verify homepage load, search reachability, and safe listing navigation.

## Manual-Only Flows

- Real login
- Registration
- CAPTCHA
- OTP/SMS
- Checkout
- Payment
- Identity verification
- Saved address/card flows
- Final order placement

## Automation Limitations

Public websites often lack stable test selectors and may apply bot protection. The tests are intentionally conservative and should not be treated as full certification of production quality.

## CI/CD Recommendation

Run a minimal smoke suite on a controlled cadence. Avoid aggressive parallelization against production. Full regression belongs in a staging environment with agreed test data and monitoring.
