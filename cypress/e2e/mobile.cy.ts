import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { MobilePage } from '../pages/MobilePage';
import { SearchPage } from '../pages/SearchPage';

describe('Mobile responsive public smoke', { tags: ['@regression'] }, () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const mobilePage = new MobilePage();

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

  it('mobile navigation or hamburger menu is visible if available', () => {
    mobilePage.assertHamburgerMenuVisibleIfAvailable();
  });

  it('footer is visible on mobile after scroll', () => {
    mobilePage.assertFooterVisibleOnMobile();
  });

  it('homepage loads on small phone viewport (375x667)', () => {
    cy.viewport(375, 667);
    cy.reload();
    cy.handleCookieBannerSafely();
    homePage.assertHomePageLoaded();
  });

  it('homepage loads on tablet viewport (768x1024)', () => {
    cy.viewport(768, 1024);
    cy.reload();
    cy.handleCookieBannerSafely();
    homePage.assertHomePageLoaded();
    homePage.assertSearchBoxVisible();
  });

  it('search results are accessible on mobile viewport', () => {
    searchPage.openSearchResults(testData.searchTerms.valid);
    searchPage.assertSearchResultsLoaded();
    cy.get('body').should('be.visible').and('not.be.empty');
  });

  it('mobile page stays outside unsafe URLs', () => {
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });
});
