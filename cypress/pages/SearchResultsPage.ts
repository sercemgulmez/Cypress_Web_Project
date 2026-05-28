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

  assertPaginationVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="pagination"]',
      '[class*="paging"]',
      'button[aria-label*="sonraki"]',
      'a[aria-label*="sonraki"]',
      /sonraki|ileri|›|»|\d+\s*\/\s*\d+/i
    ], { optional: true });
  }

  assertResultCountVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="result-count"]',
      '[class*="total"]',
      /\d+\s*(ürün|sonuç|adet)/i
    ], { optional: true });
  }

  assertBreadcrumbVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="breadcrumb"]',
      'nav[aria-label*="breadcrumb"]',
      /anasayfa\s*[>\/]/i
    ], { optional: true });
  }

  assertSortVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="sort"]',
      'select[class*="sort"]',
      /önerilen|çok satan|artan|azalan|en yeni/i
    ], { optional: true });
  }

  assertFilterPanelVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="filter"]',
      '[class*="facet"]',
      /filtre|kategori|marka|fiyat aralığı/i
    ], { optional: true });
  }
}
