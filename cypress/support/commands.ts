import { BOUNDARY_PATTERN } from './constants';

declare global {
  namespace Cypress {
    interface Chainable {
      safeVisit(path?: string): Chainable<void>;
      handleCookieBannerSafely(): Chainable<void>;
      detectManualBoundary(): Chainable<boolean>;
      assertNoRealSubmission(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('safeVisit', (path = '/') => {
  cy.visit(path, {
    failOnStatusCode: false,
    timeout: 60000
  });
  cy.handleCookieBannerSafely();
  cy.assertNoRealSubmission();
});

Cypress.Commands.add('handleCookieBannerSafely', () => {
  cy.get('body', { timeout: 10000 }).then(($body) => {
    const cookieButtons = [
      /kabul et/i,
      /tümünü kabul/i,
      /accept all/i,
      /accept/i,
      /anladım/i,
      /tamam/i
    ];

    for (const label of cookieButtons) {
      const $button = $body.find('button').filter((_, element) => label.test(element.innerText));
      if ($button.length) {
        ($button.first()[0] as HTMLElement).click();
        break;
      }
    }

    const closeSelectors = [
      '[aria-label*="Kapat"]',
      '[aria-label*="Close"]',
      'button[title*="Kapat"]',
      'button[title*="Close"]',
      '[class*="close"]',
      '[class*="Close"]',
      '.modal-close'
    ];

    for (const selector of closeSelectors) {
      const $close = $body.find(selector).filter(':visible').first();
      if ($close.length) {
        ($close[0] as HTMLElement).click();
        break;
      }
    }
  });
});

Cypress.Commands.add('detectManualBoundary', () => {
  return cy.get('body').then(($body) => BOUNDARY_PATTERN.test($body.text()));
});

Cypress.Commands.add('assertNoRealSubmission', () => {
  cy.location('href').should('not.match', /\/sepetim\/checkout|\/checkout|\/payment|\/odeme|\/siparis/i);
});

export {};
