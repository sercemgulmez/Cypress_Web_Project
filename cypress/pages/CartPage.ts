import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  verifyCartEntryBoundary(): void {
    this.visit('/sepetim');
    cy.get('body').should('be.visible').and('not.be.empty');
  }

  assertCheckoutBoundary(): void {
    this.detectManualBoundary().then((hasBoundary) => {
      cy.log(hasBoundary ? 'Cart, login, or checkout boundary detected.' : 'No checkout action was attempted.');
    });
    cy.location('href').should('not.match', /checkout|payment|odeme/i);
  }

  doNotCheckout(): void {
    cy.get('body').then(($body) => {
      const hasCheckoutSignal = /siparişi tamamla|ödeme|checkout|satın al/i.test($body.text());
      cy.log(hasCheckoutSignal ? 'Checkout signal documented as manual-only.' : 'Checkout signal was not visible.');
    });
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  }
}
