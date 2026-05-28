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

  it('price range filter is visible if available', () => {
    filterSortPage.assertPriceFilterVisibleIfAvailable();
  });

  it('brand filter is visible if available', () => {
    filterSortPage.assertBrandFilterVisibleIfAvailable();
  });

  it('selecting first sort option stays on safe page', () => {
    filterSortPage.selectFirstSortOptionSafely();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });

  it('filter controls do not navigate to unsafe pages', () => {
    filterSortPage.assertFiltersVisibleIfAvailable();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|login/i);
  });

  it('URL sort or filter param is logged after sort interaction', () => {
    filterSortPage.openSortControlIfVisible();
    filterSortPage.assertUrlContainsSortOrFilterParam();
  });

  it('alternative search term also shows filter and sort controls', () => {
    searchPage.openSearchResults(testData.searchTerms.noRisk);
    searchPage.assertSearchResultsLoaded();
    filterSortPage.assertFiltersVisibleIfAvailable();
    filterSortPage.assertSortingVisibleIfAvailable();
  });
});
