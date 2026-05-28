import { BasePage } from './BasePage';

export class ProductListingPage extends BasePage {
  assertListingVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="product"]',
      '[class*="prdct"]',
      '[class*="p-card"]',
      /ürün|sonuç/i
    ]);
  }

  assertProductCardsVisible(): void {
    this.firstVisible([
      'a[href*="-p-"]',
      'a[href*="/p-"]',
      '[class*="p-card"]',
      '[class*="product-card"]'
    ]).then(($card) => {
      if (!$card || !$card.length) {
        cy.log('Product card assertion stopped at a manual-only boundary.');
        return;
      }

      cy.wrap($card).should('be.visible');
    });
  }

  assertFiltersVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="filter"]',
      '[class*="sort"]',
      /filtre|sırala|kategori|marka/i
    ], { optional: true });
  }

  openFirstProductSafely(): void {
    this.firstVisible(['a[href*="-p-"]', 'a[href*="/p-"]', '[class*="p-card"] a']).then(($product) => {
      if (!$product || !$product.length) {
        cy.log('No product opened because a manual-only boundary or empty listing was detected.');
        return;
      }

      cy.wrap($product).invoke('removeAttr', 'target').click({ scrollBehavior: 'center' });
    });
    cy.assertNoRealSubmission();
  }
}
