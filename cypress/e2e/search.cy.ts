import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

describe('Search public flow', { tags: ['@smoke', '@critical'] }, () => {
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

  it('Turkish character search loads results safely', () => {
    searchPage.searchFor('çanta');
    searchPage.assertSearchResultsPageLoaded();
  });

  it('search URL reflects the query term', () => {
    searchPage.openSearchResults(testData.searchTerms.valid);
    cy.location('href').should('include', testData.searchTerms.valid);
  });

  it('symbol-only search stays on safe page without checkout redirect', () => {
    searchPage.openSearchResults(testData.invalidInputs.symbolSearch);
    cy.location('href').should('not.match', /checkout|payment|odeme/i);
    cy.get('body').should('be.visible');
  });

  it('alternative Turkish search term also loads results safely', () => {
    searchPage.openSearchResults('ayakkabı');
    searchPage.assertSearchResultsPageLoaded();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|giris|login/i);
  });

  it('autocomplete suggestions appear when typing if available', () => {
    searchPage.typeInSearchBoxAndWait(testData.searchTerms.valid);
    searchPage.assertAutocompleteVisibleIfAvailable();
  });

  it('search for no-risk term does not cross unsafe boundary', () => {
    searchPage.openSearchResults(testData.searchTerms.noRisk);
    searchPage.assertSearchResultsPageLoaded();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });
});
