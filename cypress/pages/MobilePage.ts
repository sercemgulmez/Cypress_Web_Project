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

  assertHamburgerMenuVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="hamburger"]',
      '[class*="burger"]',
      '[class*="menu-toggle"]',
      'button[aria-label*="menu"]',
      'button[aria-label*="menü"]',
      /menü/i
    ], { optional: true });
  }

  assertFooterVisibleOnMobile(): void {
    cy.scrollTo('bottom', { duration: 400 });
    this.assertVisibleByCandidates(['footer', /yardım|gizlilik|iletişim/i], { optional: true });
  }
}
