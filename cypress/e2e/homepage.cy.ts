import { HomePage } from '../pages/HomePage';

describe('Homepage public smoke', { tags: ['@smoke', '@critical'] }, () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('homepage loads successfully', () => {
    homePage.assertHomePageLoaded();
  });

  it('header, search, and footer signals are visible', () => {
    homePage.assertHeaderVisible();
    homePage.assertSearchBoxVisible();
    homePage.assertFooterVisible();
  });

  it('handles cookie banner safely if visible', () => {
    homePage.handleCookieBannerSafely();
    homePage.assertHomePageLoaded();
  });

  it('main public content is visible', () => {
    homePage.assertMainContentVisible();
  });

  it('page title contains Trendyol', () => {
    homePage.assertPageTitleContainsTrendyol();
  });

  it('logo is visible', () => {
    homePage.assertLogoVisible();
  });

  it('banner or campaign area is visible when available', () => {
    homePage.assertBannerOrCarouselVisible();
  });

  it('category quick links are visible when available', () => {
    homePage.assertCategoryLinksVisible();
  });

  it('page stays on trendyol.com domain and is not on a checkout URL', () => {
    homePage.assertNoUnsafePage();
    cy.location('hostname').should('include', 'trendyol.com');
  });
});
