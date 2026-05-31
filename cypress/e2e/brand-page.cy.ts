import { BrandPage } from '../pages/BrandPage';

describe('Brand page public smoke', { tags: ['@regression'] }, () => {
  const brandPage = new BrandPage();

  it('brand search via URL loads a safe page', () => {
    brandPage.searchBrandViaUrl('samsung');
    brandPage.assertBrandPageLoaded();
  });

  it('brand search results contain product signals when available', () => {
    brandPage.searchBrandViaUrl('apple');
    brandPage.assertBrandProductsVisible();
  });

  it('brand page stays outside unsafe URLs', () => {
    brandPage.searchBrandViaUrl('nike');
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|login/i);
  });

  it('brand navigation from search is safe', () => {
    cy.safeVisit('/sr?q=samsung');
    cy.get('body', { timeout: 20000 }).should('be.visible');
    cy.assertNoRealSubmission();
  });

  it('brand page title is non-empty', () => {
    brandPage.searchBrandViaUrl('adidas');
    cy.title().should('not.be.empty');
  });
});
