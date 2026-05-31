import { HomePage } from '../pages/HomePage';

const viewports: Array<{ name: string; width: number; height: number }> = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile-large', width: 414, height: 896 },
  { name: 'mobile-small', width: 375, height: 667 },
  { name: 'mobile-xs', width: 320, height: 568 },
];

describe('Cross-viewport public smoke', { tags: ['@regression'] }, () => {
  const homePage = new HomePage();

  viewports.forEach(({ name, width, height }) => {
    it(`homepage body is visible on ${name} (${width}x${height})`, () => {
      cy.viewport(width, height);
      homePage.visitHome();
      cy.get('body').should('be.visible').and('not.be.empty');
      cy.location('hostname').should('include', 'trendyol.com');
    });
  });
});
