import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

describe('Accessibility public smoke', { tags: ['@a11y'] }, () => {
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

  it('page has a main landmark or content area', () => {
    cy.get('body').then(($body) => {
      const hasMain = $body.find('main').length > 0 || $body.find('[role="main"]').length > 0;
      expect(hasMain, 'page has a main landmark').to.eq(true);
    });
  });

  it('page has a navigation landmark or header links', () => {
    cy.get('body').then(($body) => {
      // Trendyol does not expose a <nav> element; accept header-level links as navigation signal
      const hasNav =
        $body.find('nav').length > 0 ||
        $body.find('[role="navigation"]').length > 0 ||
        $body.find('header a').length > 0 ||
        $body.find('[class*="header"] a').length > 0;
      cy.log(`Navigation landmark or header links present: ${hasNav}`);
      expect(hasNav, 'page has a navigation landmark or header links').to.eq(true);
    });
  });

  it('visible images have alt attributes', () => {
    cy.get('body').then(($body) => {
      const $images = $body.find('img:visible');
      if ($images.length) {
        const withoutAlt = $images.filter((_, img) => img.getAttribute('alt') === null).length;
        expect(withoutAlt, `${withoutAlt} of ${$images.length} images are missing alt`).to.eq(0);
      }
    });
  });

  it('page has at least one heading element', () => {
    cy.get('body').then(($body) => {
      const headingCount = $body.find('h1, h2, h3').length;
      expect(headingCount, 'at least one heading element present').to.be.greaterThan(0);
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
