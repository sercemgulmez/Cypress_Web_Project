import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

describe('Search public flow', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('user can perform a safe public search', () => {
    searchPage.searchFor(testData.searchTerms.valid);
    searchPage.assertSearchResultsPageLoaded();
  });

  it('search results page displays listing content', () => {
    searchPage.searchFor(testData.searchTerms.noRisk);
    searchPage.assertSearchResultsPageLoaded();
    searchPage.assertSearchResultsVisible();
  });

  it('basic search does not require login', () => {
    searchPage.searchFor(testData.searchTerms.alternative);
    searchPage.assertSearchResultsPageLoaded();
    cy.location('href').should('not.match', /giris|login/i);
  });
});
