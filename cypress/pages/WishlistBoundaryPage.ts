import { BasePage } from './BasePage';

export class WishlistBoundaryPage extends BasePage {
  openFavoritesIfAvailable(): void {
    cy.safeVisit('/');
    cy.get('body').then(($body) => {
      const $favLink = $body
        .find('a')
        .filter((_, el) => /favori|istek listesi|wishlist/i.test(el.innerText + (el.getAttribute('href') || '')))
        .filter(':visible')
        .first();

      if ($favLink.length) {
        const href = $favLink.attr('href');
        cy.safeVisit(href || '/');
      } else {
        cy.log('No favorites link found on page; skipping navigation.');
      }
    });
  }

  assertWishlistBoundaryOrPublicPage(): void {
    cy.get('body').should('be.visible');
    cy.detectManualBoundary().then((hasBoundary) => {
      cy.log(hasBoundary
        ? 'Wishlist requires login — manual-only boundary documented.'
        : 'Wishlist page is public or already bounded safely.'
      );
    });
    cy.assertNoRealSubmission();
  }

  doNotAddToWishlist(): void {
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  }

  assertFavoriteIconVisibleOnHomepage(): void {
    cy.safeVisit('/');
    this.assertVisibleByCandidates([
      'a[href*="favori"]',
      '[class*="favorite"]',
      '[aria-label*="favori"]',
      /favori/i
    ], { optional: true });
  }
}
