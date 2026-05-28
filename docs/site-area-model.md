# Site Area Model

This model maps safe public e-commerce areas for production-friendly QA automation. Unsafe account, checkout, payment, identity, OTP, CAPTCHA, and final-submission flows remain manual-only or staging-only.

| # | Area | Purpose | Business Risk | Customer Impact | Automation Feasibility | Manual Boundary Risk | Recommended Test Type |
|---:|---|---|---|---|---|---|---|
| 1 | Homepage | Entry point for public shopping discovery | P0 outage or broken content blocks user discovery | Users cannot start browsing or searching | High | Low | Smoke and regression |
| 2 | Header navigation | Expose brand, search, and top-level navigation | P0 because navigation/search is central | Users cannot move across public catalog | High | Low | Smoke |
| 3 | Search | Find products from public terms | P0 revenue discovery path | Users cannot locate products | High | Low | Smoke and regression |
| 4 | Search results | Display matching public catalog content | P0 search conversion path | Users cannot compare items | High | Medium if anti-bot appears | Smoke and boundary-aware regression |
| 5 | Category navigation | Browse products by public categories | P1 discovery path | Users lose structured browsing | Partial | Medium | Regression |
| 6 | Product listing | Show product cards, filters, sort entry | P0 catalog visibility | Users cannot evaluate options | High | Medium | Smoke and regression |
| 7 | Product detail | Show public product information | P0 pre-purchase decision page | Users cannot inspect product | High | Medium | Smoke |
| 8 | Campaign / promotion areas | Expose public deals and campaigns | P1 commercial merchandising | Users may miss offers | Partial | Low | Regression |
| 9 | Filters | Narrow listing by public facets | P1 discoverability and relevance | Users spend longer searching | Partial | Medium | Regression |
| 10 | Sorting | Change listing order | P1 comparison workflow | Users cannot prioritize results | Partial | Medium | Regression |
| 11 | Product card interactions | Validate public card information and safe links | P1 listing confidence | Users cannot compare quickly | High | Medium | Regression |
| 12 | Favorite boundary | Detect favorite login/account boundary | P1 account conversion surface | Users see expected login requirement | Partial | High | Boundary |
| 13 | Add-to-cart boundary | Detect cart/add-to-cart boundary without purchase | P1 purchase intent boundary | Users see cart CTA availability | Partial | High | Boundary |
| 14 | Cart boundary | Open cart boundary without checkout | P1 order funnel entry | Users need clear cart state | Partial | High | Boundary |
| 15 | Login boundary | Open login page only, no submit | P1 account access boundary | Users can identify sign-in entry | Partial | High | Boundary |
| 16 | Register boundary | Document registration as manual-only | P2 account creation risk | Users need registration path | No on prod | High | Manual-only |
| 17 | Checkout boundary | Document checkout as manual-only | P0 revenue critical but unsafe on prod | Users complete purchases in real life | No on prod | High | Manual-only |
| 18 | Payment boundary | Document payment as manual-only | P0 legal/financial risk | Users pay securely | No on prod | High | Manual-only |
| 19 | Help / support pages | Open public help or static support content | P1 trust/support path | Users can find assistance | High for static pages | Medium for live chat | Smoke |
| 20 | Footer / legal links | Open public legal/company information | P2 trust/compliance content | Users access policies | High | Low | Smoke |
| 21 | Cookie / consent banner | Handle visible consent safely | P1 can block interaction | Users can continue browsing | High | Medium | Smoke |
| 22 | Mobile homepage | Validate mobile public entry | P1 mobile traffic risk | Mobile users can start | High | Low | Mobile smoke |
| 23 | Mobile search | Validate mobile search access | P1 mobile discovery | Mobile users can search | High | Low | Mobile smoke |
| 24 | Mobile category navigation | Validate mobile category signals | P2 mobile browsing | Mobile users can browse categories | Partial | Medium | Mobile regression |
| 25 | Mobile product detail | Validate product detail on small viewport | P1 product decision on mobile | Mobile users can inspect products | Partial | Medium | Mobile smoke |
| 26 | Accessibility smoke | Basic title, visibility, keyboard-reachable controls | P2 inclusive access risk | Users may be blocked by UI barriers | Partial | Low | Accessibility smoke |
| 27 | SEO metadata smoke | Basic title/meta presence | P2 organic discovery risk | Users may not find pages from search engines | High | Low | SEO smoke |
| 28 | Error/empty result states | Validate no/edge result states safely | P2 resilience and messaging | Users understand empty results | Partial | Low | Negative |
| 29 | Cross-browser smoke | Run critical flows in Chrome/Electron | P2 compatibility risk | Users on common browsers can browse | High | Low | Cross-browser smoke |
| 30 | Visual regression candidates | Identify stable public visual checkpoints | P3 UI consistency | Users see polished UI | Requires tooling | Low | Visual candidate review |

## Safety Notes

- Automation should observe public behavior only.
- Any login, registration, checkout, payment, OTP, CAPTCHA, identity verification, or anti-bot challenge is a manual-only boundary.
- Broad crawling, scraping, load testing, or bypass attempts are out of scope.
