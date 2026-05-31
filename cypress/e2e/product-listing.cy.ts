import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { SearchPage } from '../pages/SearchPage';

describe('Product listing public smoke', { tags: ['@regression'] }, () => {
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
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      const manualBoundaryVisible = /güvenlik doğrulaması|captcha|cloudflare|bot|login|giriş yap/i.test(bodyText);

      if (manualBoundaryVisible) {
        cy.log('Manual-only boundary appeared after product-listing navigation attempt.');
        return;
      }

      cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
    });
  });

  it('product card has image and name signal', () => {
    listingPage.assertProductCardHasImageAndNameSignal();
  });

  it('pagination controls are visible if available', () => {
    listingPage.assertPaginationVisibleIfAvailable();
  });

  it('electronics category listing page loads safely', () => {
    listingPage.openListingByCategoryUrl('/elektronik');
    cy.get('body').should('be.visible').and('not.be.empty');
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });

  it('alternative search term listing is also safe', () => {
    cy.safeVisit('/');
    searchPage.searchFor(testData.searchTerms.alternative);
    searchPage.assertSearchResultsPageLoaded();
    listingPage.assertListingVisible();
  });

  it('listing does not navigate to auth or checkout pages', () => {
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|hesabim|login/i);
  });
});
