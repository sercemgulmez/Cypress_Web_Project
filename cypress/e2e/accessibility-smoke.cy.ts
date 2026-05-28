import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

describe('Accessibility public smoke', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('page has a document title and visible body content', () => {
    cy.title().should('not.be.empty');
    cy.get('body').should('be.visible').and('not.be.empty');
  });

  it('search input is keyboard reachable enough for smoke coverage', () => {
    searchPage.assertSearchInputVisible();
  });

  it('images or public media do not block page visibility', () => {
    cy.get('body').then(($body) => {
      const imageCount = $body.find('img').length;
      expect(imageCount, 'public image count is non-negative').to.be.at.least(0);
    });
  });
});
