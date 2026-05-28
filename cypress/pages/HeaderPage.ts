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

  assertLogoVisible(): void {
    this.assertVisibleByCandidates([
      'a[href="/"] img',
      '[class*="logo"]',
      'img[alt*="Trendyol"]',
      'img[alt*="trendyol"]'
    ], { optional: true });
  }

  assertCartIconVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="basket"]',
      '[class*="cart"]',
      'a[href*="sepet"]',
      '[aria-label*="sepet"]',
      /sepet/i
    ], { optional: true });
  }

  assertFavoriteIconVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="favorite"]',
      '[class*="wishlist"]',
      'a[href*="favori"]',
      '[aria-label*="favori"]',
      /favori/i
    ], { optional: true });
  }

  assertCategoryMenuVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="category-menu"]',
      '[class*="main-nav"]',
      /kadın|erkek|elektronik|moda/i
    ], { optional: true });
  }
}
