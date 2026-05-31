import { HeaderPage } from '../pages/HeaderPage';
import { HomePage } from '../pages/HomePage';

describe('Header and navigation public smoke', { tags: ['@smoke'] }, () => {
  const homePage = new HomePage();
  const headerPage = new HeaderPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('header and search are visible', () => {
    headerPage.assertHeaderVisible();
    headerPage.assertSearchVisible();
  });

  it('public navigation signals are visible when available', () => {
    headerPage.assertNavigationVisible();
  });

  it('safe navigation does not enter account or checkout flows', () => {
    headerPage.openSafeNavigationItem();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|account|hesabim/i);
  });

  it('logo is visible in the header', () => {
    headerPage.assertLogoVisible();
  });

  it('cart icon is visible if available', () => {
    headerPage.assertCartIconVisible();
  });

  it('favorite icon is visible if available', () => {
    headerPage.assertFavoriteIconVisible();
  });

  it('category menu items are visible when available', () => {
    headerPage.assertCategoryMenuVisible();
  });

  it('header persists on search results page', () => {
    cy.safeVisit('/sr?q=laptop');
    headerPage.assertHeaderVisible();
    headerPage.assertSearchVisible();
  });
});
