import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  openLoginPageIfVisible(): void {
    this.visit('/giris');
    cy.handleCookieBannerSafely();
  }

  assertLoginFormVisible(): void {
    this.assertVisibleByCandidates([
      'input[type="email"]',
      'input[type="password"]',
      /e-posta|email|şifre|giriş yap/i
    ]);
  }

  verifyLoginBoundaryOnly(): void {
    this.detectManualBoundary().then((hasBoundary) => {
      expect(hasBoundary, 'login remains a manual boundary').to.eq(true);
    });
  }

  doNotAttemptRealLogin(): void {
    cy.get('input[type="email"], input[name*="email"], input[autocomplete="email"]').should('exist');
    cy.get('form').then(($forms) => {
      expect($forms.length, 'form may be visible, but it is not submitted').to.be.greaterThan(0);
    });
    cy.location('href').should('not.match', /account|hesabim|siparislerim/i);
  }
}
