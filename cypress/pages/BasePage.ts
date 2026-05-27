export class BasePage {
  protected readonly boundaryPattern =
    /captcha|recaptcha|otp|sms|doğrulama|verification|payment|ödeme|checkout|siparişi tamamla|kimlik|identity|giriş yap|login|üye ol|register/i;

  visit(path = '/'): void {
    cy.safeVisit(path);
  }

  handleCookieBannerSafely(): void {
    cy.handleCookieBannerSafely();
  }

  detectManualBoundary(): Cypress.Chainable<boolean> {
    return cy.detectManualBoundary();
  }

  assertPageContainsText(text: string | RegExp): void {
    cy.contains(text).should('be.visible');
  }

  safeClickVisible(selectorOrText: string | RegExp): void {
    if (typeof selectorOrText === 'string' && /^[.#\[]/.test(selectorOrText)) {
      cy.get(selectorOrText).filter(':visible').first().click({ scrollBehavior: 'center' });
      return;
    }

    cy.contains(selectorOrText).should('be.visible').click({ scrollBehavior: 'center' });
  }

  getBodyText(): Cypress.Chainable<string> {
    return cy.get('body').invoke('text');
  }

  assertNoUnsafePage(): void {
    cy.assertNoRealSubmission();
  }

  assertVisibleByCandidates(candidates: Array<string | RegExp>, options: { optional?: boolean } = {}): void {
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      const matched = candidates.some((candidate) => {
        if (candidate instanceof RegExp) {
          return candidate.test(bodyText);
        }

        return $body.find(candidate).length > 0 || bodyText.includes(candidate);
      });

      if (!matched && !options.optional) {
        throw new Error(`None of the expected public page signals were visible: ${candidates.join(', ')}`);
      }
    });
  }

  protected firstVisible(selectors: string[]): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').then(($body): Cypress.Chainable<JQuery<HTMLElement>> => {
      for (const selector of selectors) {
        const $match = $body.find(selector).filter(':visible').first();
        if ($match.length) {
          return cy.wrap($match as JQuery<HTMLElement>);
        }
      }

      throw new Error(`No visible element found for selectors: ${selectors.join(', ')}`);
    }) as Cypress.Chainable<JQuery<HTMLElement>>;
  }
}
