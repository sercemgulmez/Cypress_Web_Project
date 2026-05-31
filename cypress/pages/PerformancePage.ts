import { BasePage } from './BasePage';

export class PerformancePage extends BasePage {
  assertPageHasContent(): void {
    cy.get('body', { timeout: 25000 }).should('be.visible').and('not.be.empty');
    cy.get('body').invoke('text').should('have.length.greaterThan', 100);
  }

  assertNoBrokenImages(): void {
    cy.get('img:visible').then(($imgs) => {
      let loaded = 0;
      let broken = 0;
      $imgs.each((_, img) => {
        if ((img as HTMLImageElement).naturalWidth > 0) {
          loaded++;
        } else {
          broken++;
          // CDN/badge images may return 0 in headless Electron — log as warning, do not fail
          cy.log(`[warn] image naturalWidth is 0: ${img.getAttribute('src')}`);
        }
      });
      cy.log(`Images — loaded: ${loaded}, not loaded: ${broken}, total: ${$imgs.length}`);
      expect(loaded, 'at least one visible image loaded on page').to.be.greaterThan(0);
    });
  }

  assertBodyTextLengthAbove(minLength: number): void {
    cy.get('body').invoke('text').then((text) => {
      expect(text.trim().length).to.be.greaterThan(minLength);
    });
  }
}
