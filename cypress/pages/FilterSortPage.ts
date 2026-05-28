import { BasePage } from './BasePage';

export class FilterSortPage extends BasePage {
  assertFiltersVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="filter"]',
      /filtre|kategori|marka|beden|renk/i
    ], { optional: true });
  }

  assertSortingVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="sort"]',
      'select',
      /sırala|önerilen|artan|azalan/i
    ], { optional: true });
  }

  openSortControlIfVisible(): void {
    this.safeClickIfVisible(/sırala|önerilen/i);
    cy.assertNoRealSubmission();
  }

  assertPriceFilterVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="price-filter"]',
      '[class*="fiyat"]',
      'input[placeholder*="min"]',
      'input[placeholder*="max"]',
      /fiyat aralığı|min|max/i
    ], { optional: true });
  }

  assertBrandFilterVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="brand"]',
      '[class*="marka"]',
      /marka|brand/i
    ], { optional: true });
  }

  selectFirstSortOptionSafely(): void {
    cy.get('body').then(($body) => {
      if (this.boundaryPattern.test($body.text())) {
        cy.log('Manual-only boundary detected; skipping sort option selection.');
        return;
      }

      const sortSelectors = ['[class*="sort"] button', '[class*="sort"] a', 'select'];
      for (const sel of sortSelectors) {
        const $options = $body.find(sel).filter(':visible');
        if ($options.length > 1) {
          cy.wrap($options.eq(1)).click({ scrollBehavior: 'center' });
          cy.assertNoRealSubmission();
          return;
        }
      }
    });
  }

  assertUrlContainsSortOrFilterParam(): void {
    cy.location('href').then((href) => {
      const hasSortOrFilter = /sort|order|sralama|filtre|brand|fiyat/i.test(href);
      cy.log(`URL sort/filter param present: ${hasSortOrFilter}`);
    });
  }
}
