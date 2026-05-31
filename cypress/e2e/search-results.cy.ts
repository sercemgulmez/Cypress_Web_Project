import testData from '../fixtures/test-data.json';
import { SearchPage } from '../pages/SearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

describe('Search results public smoke', { tags: ['@smoke'] }, () => {
  const searchPage = new SearchPage();
  const resultsPage = new SearchResultsPage();

  beforeEach(() => {
    searchPage.openSearchResults(testData.searchTerms.valid);
  });

  it('search results route loads safely', () => {
    searchPage.assertSearchResultsLoaded();
  });

  it('results and product card signals are visible or safely bounded', () => {
    resultsPage.assertResultsVisible();
    resultsPage.assertProductCardsVisible();
  });

  it('first product can be opened only when public result is available', () => {
    resultsPage.openFirstSafeProduct();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });

  it('result count is visible if available', () => {
    resultsPage.assertResultCountVisibleIfAvailable();
  });

  it('pagination controls are visible when available', () => {
    resultsPage.assertPaginationVisibleIfAvailable();
  });

  it('breadcrumb area is visible if available', () => {
    resultsPage.assertBreadcrumbVisibleIfAvailable();
  });

  it('sort controls are visible when available', () => {
    resultsPage.assertSortVisibleIfAvailable();
  });

  it('filter panel is visible when available', () => {
    resultsPage.assertFilterPanelVisibleIfAvailable();
  });

  it('page title is non-empty on results page', () => {
    cy.title().should('not.be.empty');
  });
});
