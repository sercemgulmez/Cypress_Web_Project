import { BasePage } from './BasePage';

export class PerformancePage extends BasePage {
  assertPageHasContent(): void {
    cy.get('body', { timeout: 25000 }).should('be.visible').and('not.be.empty');
    cy.get('body').invoke('text').should('have.length.greaterThan', 100);
  }

  assertNoBrokenImages(): void {
    cy.get('img:visible').each(($img) => {
      expect(
        ($img[0] as HTMLImageElement).naturalWidth,
        `broken image: ${$img.attr('src')}`
      ).to.be.greaterThan(0);
    });
  }

  assertBodyTextLengthAbove(minLength: number): void {
    cy.get('body').invoke('text').then((text) => {
      expect(text.trim().length).to.be.greaterThan(minLength);
    });
  }
}
