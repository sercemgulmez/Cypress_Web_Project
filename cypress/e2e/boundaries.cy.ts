import { BoundaryPage } from '../pages/BoundaryPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

describe('Manual-only boundary documentation smoke', { tags: ['@boundary'] }, () => {
  const boundaryPage = new BoundaryPage();
  const loginPage = new LoginPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.safeVisit('/');
  });

  it('login boundary is visible but not submitted', () => {
    loginPage.openLoginPageIfVisible();
    boundaryPage.assertLoginBoundary();
  });

  it('cart boundary is visited without checkout', () => {
    cartPage.verifyCartEntryBoundary();
    boundaryPage.assertCartBoundary();
  });

  it('checkout and payment remain manual-only', () => {
    boundaryPage.assertCheckoutBoundary();
    boundaryPage.assertPaymentBoundary();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });
});
