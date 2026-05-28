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
}
