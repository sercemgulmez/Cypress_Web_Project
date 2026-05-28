import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  assertSearchInputVisible(): void {
    this.assertVisibleByCandidates([
      'input[type="text"]',
      'input[placeholder*="Ara"]',
      '[class*="search"]',
      /ürün, kategori veya marka ara/i
    ]);
  }

  searchFor(term: string): void {
    const searchSelectors = [
      'input[type="text"]',
      'input[placeholder*="Ara"]',
      'input[placeholder*="ara"]',
      '[data-testid*="search"] input',
      '[class*="search"] input'
    ];

    cy.handleCookieBannerSafely();
    cy.get('body').then(($body) => {
      for (const selector of searchSelectors) {
        const $input = $body.find(selector).filter(':visible').first();
        if ($input.length) {
          cy.wrap($input).clear().type(`${term}{enter}`);
          return;
        }
      }

      this.openSearchResults(term);
    });
  }

  openSearchResults(term: string): void {
    cy.safeVisit(`/sr?q=${encodeURIComponent(term)}`);
  }

  assertSearchResultsPageLoaded(): void {
    cy.location('href', { timeout: 20000 }).should('match', /q=|sr\?|\/s\//i);
    this.assertNoUnsafePage();
  }

  assertSearchResultsLoaded(): void {
    this.assertSearchResultsPageLoaded();
  }

  searchInvalidOrNoRiskTermSafely(term: string): void {
    this.searchFor(term);
    this.assertSearchResultsPageLoaded();
  }

  assertSearchResultsVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="prdct"]',
      '[class*="product"]',
      '[class*="p-card"]',
      '[data-testid*="product"]',
      /sonuç|ürün|laptop|kulaklık|kitap/i
    ]);
  }

  openFirstSafeProductResult(): void {
    this.firstVisible([
      'a[href*="-p-"]',
      'a[href*="/p-"]',
      '[class*="p-card"] a',
      '[class*="product"] a'
    ]).then(($result) => {
      if (!$result || !$result.length) {
        cy.log('No product result opened because a manual-only boundary or empty listing was detected.');
        return;
      }

      cy.wrap($result).invoke('removeAttr', 'target').click({ scrollBehavior: 'center' });
    });
    cy.assertNoRealSubmission();
  }
}
