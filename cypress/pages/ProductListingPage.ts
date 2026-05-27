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
    ]).should('be.visible');
  }

  assertFiltersVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="filter"]',
      '[class*="sort"]',
      /filtre|sırala|kategori|marka/i
    ], { optional: true });
  }

  openFirstProductSafely(): void {
    this.firstVisible(['a[href*="-p-"]', 'a[href*="/p-"]', '[class*="p-card"] a'])
      .invoke('removeAttr', 'target')
      .click({ scrollBehavior: 'center' });
    cy.assertNoRealSubmission();
  }
}
