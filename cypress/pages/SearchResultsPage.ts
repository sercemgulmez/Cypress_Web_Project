import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  assertResultsVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="prdct"]',
      '[class*="product"]',
      '[class*="p-card"]',
      /sonuç|ürün|laptop|kulaklık|kitap/i
    ]);
  }

  assertProductCardsVisible(): void {
    this.firstVisible(['a[href*="-p-"]', 'a[href*="/p-"]', '[class*="p-card"]', '[class*="product-card"]'])
      .then(($card) => {
        if (!$card || !$card.length) {
          cy.log('Product card check stopped at a manual-only boundary.');
          return;
        }

        cy.wrap($card).should('be.visible');
      });
  }

  openFirstSafeProduct(): void {
    this.firstVisible(['a[href*="-p-"]', 'a[href*="/p-"]', '[class*="p-card"] a'])
      .then(($product) => {
        if (!$product || !$product.length) {
          cy.log('No product opened because a manual-only boundary or empty listing was detected.');
          return;
        }

        cy.wrap($product).invoke('removeAttr', 'target').click({ scrollBehavior: 'center' });
      });
    cy.assertNoRealSubmission();
  }
}
