import { WishlistBoundaryPage } from '../pages/WishlistBoundaryPage';

describe('Wishlist and favorites boundary smoke', () => {
  const wishlistPage = new WishlistBoundaryPage();

  it('favorites icon is visible on homepage if available', () => {
    wishlistPage.assertFavoriteIconVisibleOnHomepage();
  });

  it('attempting favorites navigation reaches a safe boundary', () => {
    wishlistPage.openFavoritesIfAvailable();
    wishlistPage.assertWishlistBoundaryOrPublicPage();
  });

  it('wishlist interaction does not cross checkout or payment boundary', () => {
    cy.safeVisit('/');
    wishlistPage.doNotAddToWishlist();
  });

  it('favorites boundary is documented as manual-only when login required', () => {
    cy.safeVisit('/');
    cy.detectManualBoundary().then((hasBoundary) => {
      cy.log(hasBoundary
        ? 'Manual boundary documented on homepage.'
        : 'Homepage is public; wishlist boundary will be encountered on navigation.'
      );
    });
  });
});
