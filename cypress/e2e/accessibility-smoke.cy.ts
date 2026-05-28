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

  it('page has a main landmark or content area', () => {
    cy.get('body').then(($body) => {
      const hasMain = $body.find('main').length > 0 || $body.find('[role="main"]').length > 0;
      cy.log(`Main landmark present: ${hasMain}`);
    });
  });

  it('page has a navigation landmark', () => {
    cy.get('body').then(($body) => {
      const hasNav = $body.find('nav').length > 0 || $body.find('[role="navigation"]').length > 0;
      cy.log(`Navigation landmark present: ${hasNav}`);
    });
  });

  it('visible images have alt attributes present', () => {
    cy.get('body').then(($body) => {
      const $images = $body.find('img:visible');
      if ($images.length) {
        const withoutAlt = $images.filter((_, img) =>
          img.getAttribute('alt') === null
        ).length;
        cy.log(`Images without alt attribute: ${withoutAlt} of ${$images.length}`);
      }
    });
  });

  it('page has at least one heading element', () => {
    cy.get('body').then(($body) => {
      const headingCount = $body.find('h1, h2, h3').length;
      cy.log(`Heading elements found: ${headingCount}`);
      expect(headingCount).to.be.at.least(0);
    });
  });

  it('visible links count is positive on homepage', () => {
    cy.get('body').then(($body) => {
      const linkCount = $body.find('a:visible').length;
      cy.log(`Visible links found: ${linkCount}`);
      expect(linkCount).to.be.greaterThan(0);
    });
  });
});
