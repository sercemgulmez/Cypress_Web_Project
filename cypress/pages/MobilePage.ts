import { BasePage } from './BasePage';

export class MobilePage extends BasePage {
  setMobileViewport(): void {
    cy.viewport(390, 844);
  }

  assertMobileHomeVisible(): void {
    cy.get('body').should('be.visible').and('not.be.empty');
    this.assertVisibleByCandidates(['input[type="text"]', '[class*="search"]', /trendyol|ara/i]);
  }

  assertMobileNavigationVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="menu"]',
      '[class*="category"]',
      /menü|kategori|hesabım|sepetim/i
    ], { optional: true });
  }
}
