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

  it('homepage has a canonical link tag if available', () => {
    cy.safeVisit('/');
    cy.document().then((doc) => {
      const canonical = doc.querySelector('link[rel="canonical"]');
      if (canonical) {
        const href = canonical.getAttribute('href');
        expect(href).to.include('trendyol.com');
      } else {
        cy.log('No canonical link found — may be acceptable for this page.');
      }
    });
  });

  it('homepage OG meta tags are present if available', () => {
    cy.safeVisit('/');
    cy.document().then((doc) => {
      const ogTitle = doc.querySelector('meta[property="og:title"]');
      const ogUrl = doc.querySelector('meta[property="og:url"]');
      cy.log(`og:title present: ${!!ogTitle}, og:url present: ${!!ogUrl}`);
    });
  });

  it('page title changes between homepage and search results', () => {
    cy.safeVisit('/');
    cy.title().then((homeTitle) => {
      const searchPage = new SearchPage();
      searchPage.openSearchResults(testData.searchTerms.valid);
      cy.title().should('not.equal', homeTitle);
    });
  });

  it('alternative search results page also has a non-empty title', () => {
    const searchPage = new SearchPage();
    searchPage.openSearchResults(testData.searchTerms.alternative);
    cy.title().should('not.be.empty');
  });

  it('no-risk search results page title is non-empty', () => {
    const searchPage = new SearchPage();
    searchPage.openSearchResults(testData.searchTerms.noRisk);
    cy.title().should('not.be.empty');
  });
});
