# Smoke Suite

Critical smoke tests:

| Spec | Coverage |
|---|---|
| `homepage.cy.ts` | Homepage load, header, search, footer, cookie banner, main content |
| `search.cy.ts` | Safe public search, results page, no login required |
| `product-listing.cy.ts` | Listing visibility, product cards, safe product navigation |
| `product-detail.cy.ts` | Product detail load, title, price/info, CTA visibility, no purchase |
| `login-boundary.cy.ts` | Login route smoke, login form visibility, no real login |
| `cart-boundary.cy.ts` | Cart/checkout boundary observation, no checkout/payment |
| `footer-help.cy.ts` | Footer visibility, safe public help/legal link |
| `mobile.cy.ts` | Mobile homepage and search smoke |

Recommended production-safe command:

```bash
npm run test:smoke
```
