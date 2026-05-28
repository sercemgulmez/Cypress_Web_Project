import { PerformancePage } from '../pages/PerformancePage';

describe('Performance public smoke', () => {
  const perfPage = new PerformancePage();

  it('homepage body content is non-empty and visible within load timeout', () => {
    cy.safeVisit('/');
    perfPage.assertPageHasContent();
  });

  it('search results page body content loads within timeout', () => {
    cy.safeVisit('/sr?q=laptop');
    perfPage.assertPageHasContent();
  });

  it('visible image count is logged on homepage', () => {
    cy.safeVisit('/');
    perfPage.assertNoBrokenImages();
  });

  it('homepage body text has meaningful length', () => {
    cy.safeVisit('/');
    perfPage.assertBodyTextLengthAbove(200);
  });

  it('secondary search page body text is also meaningful', () => {
    cy.safeVisit('/sr?q=kulaklık');
    cy.get('body', { timeout: 30000 }).should('be.visible');
    perfPage.assertBodyTextLengthAbove(100);
  });
});
