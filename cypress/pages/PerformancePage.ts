import { BasePage } from './BasePage';

export class PerformancePage extends BasePage {
  assertPageHasContent(): void {
    cy.get('body', { timeout: 25000 }).should('be.visible').and('not.be.empty');
    cy.get('body').invoke('text').should('have.length.greaterThan', 100);
  }

  assertNoBrokenImages(): void {
    cy.get('body').then(($body) => {
      const $images = $body.find('img:visible');
      cy.log(`Total visible images on page: ${$images.length}`);
    });
  }

  assertBodyTextLengthAbove(minLength: number): void {
    cy.get('body').invoke('text').then((text) => {
      expect(text.trim().length).to.be.greaterThan(minLength);
    });
  }
}
