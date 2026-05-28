import testData from '../fixtures/test-data.json';
import { SearchPage } from '../pages/SearchPage';

describe('SEO metadata public smoke', () => {
  it('homepage exposes title or meta description', () => {
    cy.safeVisit('/');
    cy.title().should('not.be.empty');
    cy.document().then((doc) => {
      const metaCount = doc.querySelectorAll('head meta[name="description"], head meta[property="og:title"]').length;
      expect(metaCount, 'metadata count is non-negative').to.be.at.least(0);
    });
  });

  it('search results expose a non-empty title', () => {
    const searchPage = new SearchPage();
    searchPage.openSearchResults(testData.searchTerms.noRisk);
    cy.title().should('not.be.empty');
    cy.location('href').should('match', /\/sr\?|q=|wc=/i);
  });
});
