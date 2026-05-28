import { BasePage } from './BasePage';

export class BrandPage extends BasePage {
  searchBrandViaUrl(brandName: string): void {
    cy.safeVisit(`/sr?q=${encodeURIComponent(brandName)}`);
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    cy.assertNoRealSubmission();
  }

  assertBrandPageLoaded(): void {
    cy.get('body').should('be.visible').and('not.be.empty');
    this.assertNoUnsafePage();
  }

  assertBrandProductsVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="product"]',
      '[class*="p-card"]',
      'a[href*="-p-"]',
      /ürün|marka/i
    ], { optional: true });
  }
}
