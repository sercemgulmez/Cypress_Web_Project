import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { SearchPage } from '../pages/SearchPage';

describe('Product listing public smoke', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const listingPage = new ProductListingPage();

  beforeEach(() => {
    homePage.visitHome();
    searchPage.searchFor(testData.searchTerms.valid);
    searchPage.assertSearchResultsPageLoaded();
  });

  it('listing page displays product cards', () => {
    listingPage.assertListingVisible();
    listingPage.assertProductCardsVisible();
  });

  it('filters or sorting area is visible when available', () => {
    listingPage.assertFiltersVisibleIfAvailable();
  });

  it('opening product detail from listing is safe', () => {
    listingPage.openFirstProductSafely();
    cy.location('href').should('match', /-p-|\/p-/i);
  });
});
