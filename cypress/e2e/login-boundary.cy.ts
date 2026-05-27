import { LoginPage } from '../pages/LoginPage';

describe('Login boundary smoke', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.openLoginPageIfVisible();
  });

  it('login page can be opened if public route is available', () => {
    cy.get('body').should('be.visible').and('not.be.empty');
  });

  it('login form or login boundary is visible', () => {
    loginPage.assertLoginFormVisible();
    loginPage.verifyLoginBoundaryOnly();
  });

  it('no real login attempt is performed', () => {
    loginPage.doNotAttemptRealLogin();
  });
});
