import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  visitHome(): void {
    this.visit('/');
  }

  assertHomePageLoaded(): void {
    cy.location('hostname').should('include', 'trendyol.com');
    cy.get('body').should('be.visible').and('not.be.empty');
    this.assertNoUnsafePage();
  }

  assertHeaderVisible(): void {
    this.assertVisibleByCandidates(['header', '[class*="header"]', /trendyol/i]);
  }

  assertSearchBoxVisible(): void {
    this.handleCookieBannerSafely();
    this.assertVisibleByCandidates([
      'input[type="text"]',
      'input[placeholder*="Ara"]',
      'input[placeholder*="ara"]',
      '[data-testid*="search"]',
      '[class*="search"]',
      /ürün, kategori veya marka ara/i
    ]);
  }

  assertMainContentVisible(): void {
    this.assertVisibleByCandidates(['main', '[class*="homepage"]', '[class*="product"]', /çok satan|fırsat|ürün/i]);
  }

  assertFooterVisible(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates(['footer', /yardım|hakkımızda|iletişim|güvenli alışveriş/i], { optional: true });
  }

  assertLogoVisible(): void {
    this.assertVisibleByCandidates([
      'a[href="/"] img',
      '[class*="logo"]',
      'img[alt*="Trendyol"]',
      'img[alt*="trendyol"]',
      /trendyol/i
    ]);
  }

  assertBannerOrCarouselVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="banner"]',
      '[class*="carousel"]',
      '[class*="slider"]',
      '[class*="campaign"]',
      /kampanya|fırsat|indirim/i
    ], { optional: true });
  }

  assertCategoryLinksVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="category"]',
      'nav a',
      /kadın|erkek|elektronik|ev|spor|moda/i
    ], { optional: true });
  }

  assertPageTitleContainsTrendyol(): void {
    cy.title().should('match', /trendyol/i);
  }
}
