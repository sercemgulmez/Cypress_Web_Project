import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  assertProductDetailLoaded(): void {
    cy.location('href', { timeout: 20000 }).should('match', /-p-|\/p-/i);
    cy.get('body').should('be.visible').and('not.be.empty');
    this.assertNoUnsafePage();
  }

  assertProductTitleVisible(): void {
    this.assertVisibleByCandidates(['h1', '[class*="name"]', '[class*="title"]', /ürün/i]);
  }

  assertPriceOrInfoVisible(): void {
    this.assertVisibleByCandidates(['[class*="price"]', /tl|₺|taksit|kargo/i]);
  }

  assertAddToCartOrFavoriteCtaVisible(): void {
    this.assertVisibleByCandidates([
      /sepete ekle/i,
      /favori/i,
      '[class*="basket"]',
      '[class*="favorite"]'
    ], { optional: true });
  }

  doNotPurchase(): void {
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  }

  stopBeforeUnsafeAction(): void {
    this.detectManualBoundary().then((hasBoundary) => {
      cy.log(hasBoundary ? 'Manual boundary detected; no unsafe action will be performed.' : 'No unsafe boundary interaction performed.');
    });
    this.doNotPurchase();
  }
}
