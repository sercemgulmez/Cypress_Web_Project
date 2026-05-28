import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  assertCategoryNavigationVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="category"]',
      '[class*="navigation"]',
      'nav',
      /kadın|erkek|elektronik|ev|moda|spor/i
    ], { optional: true });
  }

  openCategoryKeywordSafely(keyword: string): void {
    this.safeClickIfVisible(new RegExp(keyword, 'i'));
    cy.assertNoRealSubmission();
  }

  assertCategoryOrListingLoaded(): void {
    this.assertVisibleByCandidates([
      '[class*="product"]',
      '[class*="category"]',
      /ürün|kategori|sonuç|elektronik|moda/i
    ]);
  }
}
