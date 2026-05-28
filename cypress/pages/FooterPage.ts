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
        .filter((_, element) => {
          const text = element.innerText;
          const href = element.getAttribute('href') ?? '';
          const isStaticPublicLink = /yardım|help|gizlilik|çerez|privacy|hakkımızda|privacy|cookie/i.test(text);
          const isInteractiveSupport = /assistant|live_support|canlı|destek/i.test(`${text} ${href}`);

          return isStaticPublicLink && !isInteractiveSupport;
        })
        .filter(':visible')
        .first();

      if (safeLink.length) {
        const href = safeLink.attr('href');
        cy.safeVisit(href || '/yardim');
      } else {
        cy.safeVisit('/yardim');
      }
    });
  }

  assertHelpOrLegalPageLoaded(): void {
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    this.assertVisibleByCandidates([/yardım|help|gizlilik|privacy|çerez|iletişim|trendyol/i]);
    this.assertNoUnsafePage();
  }
}
