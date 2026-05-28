import testData from '../fixtures/test-data.json';
import { CategoryPage } from '../pages/CategoryPage';
import { HomePage } from '../pages/HomePage';

describe('Category navigation public smoke', () => {
  const homePage = new HomePage();
  const categoryPage = new CategoryPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('category navigation signals are visible when available', () => {
    categoryPage.assertCategoryNavigationVisible();
  });

  it('safe category keyword navigation stays outside checkout/account flows', () => {
    categoryPage.openCategoryKeywordSafely(testData.categoryKeywords[0]);
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|account|hesabim/i);
  });
});
