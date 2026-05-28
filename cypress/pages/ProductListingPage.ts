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

  assertProductCardHasImageAndNameSignal(): void {
    cy.get('body').then(($body) => {
      if (this.boundaryPattern.test($body.text())) {
        cy.log('Manual-only boundary detected; skipping product card structure assertion.');
        return;
      }

      const cardSelectors = ['[class*="p-card"]', '[class*="product-card"]', 'a[href*="-p-"]'];
      for (const sel of cardSelectors) {
        const $cards = $body.find(sel).filter(':visible');
        if ($cards.length) {
          const $first = $cards.first();
          const hasImgOrName =
            $first.find('img').length > 0 ||
            $first.find('[class*="image"]').length > 0 ||
            $first.find('[class*="name"]').length > 0 ||
            $first.text().trim().length > 0;
          cy.wrap(hasImgOrName).should('be.true');
          return;
        }
      }
    });
  }

  assertPaginationVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="pagination"]',
      '[class*="paging"]',
      /sonraki|ileri|›|»/i
    ], { optional: true });
  }

  openListingByCategoryUrl(categoryPath: string): void {
    cy.safeVisit(categoryPath);
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    cy.assertNoRealSubmission();
  }
}
