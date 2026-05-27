import { BasePage } from './BasePage';

export class FooterPage extends BasePage {
  assertFooterVisible(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates(['footer', /yardım|hakkımızda|iletişim|gizlilik|çerez/i]);
  }

  openSafeHelpOrLegalLink(): void {
    cy.get('body').then(($body) => {
      const safeLink = $body
        .find('a')
        .filter((_, element) => /yardım|help|gizlilik|çerez|privacy|hakkımızda/i.test(element.innerText))
        .filter(':visible')
        .first();

      if (safeLink.length) {
        cy.wrap(safeLink).invoke('removeAttr', 'target').click({ scrollBehavior: 'center' });
      } else {
        cy.visit('/yardim');
      }
    });
  }

  assertHelpOrLegalPageLoaded(): void {
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    this.assertVisibleByCandidates([/yardım|help|gizlilik|privacy|çerez|iletişim|trendyol/i]);
    this.assertNoUnsafePage();
  }
}
