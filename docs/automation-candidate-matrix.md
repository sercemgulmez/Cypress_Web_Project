# Automation Candidate Matrix

This matrix classifies the test catalog by production safety and Cypress feasibility.

## 1. Safe To Automate Now

Examples: homepage availability, header visibility, search input visibility, safe search result route, listing visibility, public product detail visibility, footer/legal static pages, cookie banner handling, mobile homepage/search, SEO title smoke.

Why: these tests observe public pages, avoid real customer actions, use fake/no personal data, and can stop when a security boundary appears.

## 2. Automate With Caution

Examples: category navigation, campaign links, filter/sort controls, first product navigation, product card link checks, mobile category navigation, basic accessibility smoke.

Why: public pages may be dynamic, personalized, hidden behind overlays, or protected by anti-bot controls. Tests must avoid force clicks, hard waits, broad crawling, and repeated requests.

## 3. Manual-Only

Examples: real login submission, registration submit, OTP/SMS, CAPTCHA, payment, checkout, final order placement, identity verification, saved address/card, account-specific pages, live support forms.

Why: these flows involve personal data, security controls, financial actions, account state, or real customer-impacting submissions. They must not be automated against public production.

## 4. Requires Staging/Test Environment

Examples: authenticated account regression, add-to-cart with test account, cart persistence, address validation, coupon redemption, checkout steps, payment authorization using test cards, order confirmation, account order history.

Why: meaningful validation requires isolated test accounts, synthetic data, test payment rails, resettable fixtures, and permission from the site owner.

## 5. Not Recommended For Production Automation

Examples: scraping product catalogs, mass category crawling, load/performance stress, CAPTCHA bypass, bot-protection circumvention, repeated login attempts, repeated form validation submission, price-monitoring crawls.

Why: these are invasive, may violate site protections or terms, and can create operational risk.

## Classification Summary

| Classification | Suitable Scope | Production Status | Cypress Approach |
|---|---|---|---|
| Safe to automate now | Public smoke and read-only checks | Allowed with light execution | POM/App Actions with boundary detection |
| Automate with caution | Dynamic public interactions | Limited | Optional assertions and no force-clicks |
| Manual-only | Sensitive/account/payment/security flows | Do not automate | Document only |
| Requires staging/test environment | Full funnel E2E | Not on public prod | Use test users/data/payment rails |
| Not recommended | Crawling, bypass, stress | Out of scope | Do not implement |
