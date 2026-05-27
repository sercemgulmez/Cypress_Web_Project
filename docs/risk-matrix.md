# Risk Matrix

| ID | Area | Scenario | Priority | Business impact | Customer impact | Automation status | Manual boundary | Notes |
|---|---|---|---|---|---|---|---|---|
| R-001 | Homepage | Homepage unavailable | P0 | High | High | Automated | No | Basic availability signal |
| R-002 | Search | Search unavailable | P0 | High | High | Automated | No | Uses safe public terms |
| R-003 | Listing | Product listing invisible | P0 | High | High | Automated | No | Validates product/listing signals |
| R-004 | Product Detail | Product detail unavailable | P0 | High | High | Automated | No | Opens first safe public result |
| R-005 | Product Detail | Major CTA not visible | P0 | Medium | High | Automated observation | No | Visibility only, no purchase |
| R-006 | Login | Login page inaccessible | P1 | Medium | Medium | Automated smoke | Yes | No credential submission |
| R-007 | Cart | Cart/checkout boundary | P1 | High | High | Automated observation | Yes | No checkout submission |
| R-008 | Footer/Help | Help/legal links unavailable | P1 | Medium | Medium | Automated smoke | No | Public informational pages |
| R-009 | Mobile | Mobile search unreachable | P1 | High | High | Automated smoke | No | Uses mobile viewport |
| R-010 | Cookie Banner | Banner blocks public flow | P1 | Medium | Medium | Automated safe handling | No | Clicks only acceptance controls if visible |
| R-011 | Filters/Sort | Listing filters unavailable | P2 | Medium | Medium | Optional automated smoke | No | Public UI changes frequently |
| R-012 | Visual | Layout inconsistency | P2 | Medium | Medium | Manual/optional | No | Visual tooling recommended separately |
| R-013 | Accessibility | Basic accessibility smoke | P2 | Medium | High | Not implemented | No | Candidate future enhancement |
| R-014 | Cross-browser | Chrome/Firefox differences | P2 | Medium | Medium | Script available | No | `test:chrome` provided |
| R-015 | Informational | Low-risk info pages | P3 | Low | Low | Optional smoke | No | Footer/help coverage |
| R-016 | Payment | Payment submission | P0 | High | High | Not automated | Yes | Manual-only in staging/test env |
| R-017 | OTP/SMS | Verification challenge | P0 | High | High | Not automated | Yes | Never bypass |
| R-018 | CAPTCHA | Anti-bot challenge | P0 | High | High | Not automated | Yes | Stop and document |
