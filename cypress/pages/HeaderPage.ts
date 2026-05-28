import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  assertHeaderVisible(): void {
    this.assertVisibleByCandidates(['header', '[class*="header"]', /trendyol/i]);
  }

  assertSearchVisible(): void {
    this.assertVisibleByCandidates([
      'input[type="text"]',
      'input[placeholder*="Ara"]',
      '[class*="search"]',
      /ürün, kategori veya marka ara/i
    ]);
  }

  assertNavigationVisible(): void {
    this.assertVisibleByCandidates([
      'nav',
      '[class*="navigation"]',
      '[class*="category"]',
      /kadın|erkek|elektronik|moda|ev/i
    ], { optional: true });
  }

  openSafeNavigationItem(): void {
    this.safeClickIfVisible(/elektronik|moda|ev|süpermarket|kitap/i);
    cy.assertNoRealSubmission();
  }
}
