import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

describe('Mobile responsive public smoke', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    cy.viewport('iphone-x');
    homePage.visitHome();
  });

  it('homepage loads on mobile viewport', () => {
    homePage.assertHomePageLoaded();
  });

  it('search is reachable on mobile', () => {
    homePage.assertSearchBoxVisible();
  });

  it('mobile search can reach listing safely if feasible', () => {
    searchPage.searchFor(testData.searchTerms.noRisk);
    searchPage.assertSearchResultsPageLoaded();
    searchPage.assertSearchResultsVisible();
  });
});
