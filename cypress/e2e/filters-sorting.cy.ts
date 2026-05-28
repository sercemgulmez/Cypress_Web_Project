import testData from '../fixtures/test-data.json';
import { FilterSortPage } from '../pages/FilterSortPage';
import { SearchPage } from '../pages/SearchPage';

describe('Filters and sorting public smoke', () => {
  const searchPage = new SearchPage();
  const filterSortPage = new FilterSortPage();

  beforeEach(() => {
    searchPage.openSearchResults(testData.searchTerms.valid);
    searchPage.assertSearchResultsLoaded();
  });

  it('filters are visible when available', () => {
    filterSortPage.assertFiltersVisibleIfAvailable();
  });

  it('sorting controls are visible when available', () => {
    filterSortPage.assertSortingVisibleIfAvailable();
  });

  it('opening sort control does not submit unsafe flows', () => {
    filterSortPage.openSortControlIfVisible();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });
});
