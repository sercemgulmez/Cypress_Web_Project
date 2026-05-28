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
          const isStaticPublicLink = /yardım|help|gizlilik|çerez|privacy|hakkımızda|cookie/i.test(text);
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

  assertLegalLinksVisible(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates([
      /gizlilik|kullanım koşul|çerez|privacy|aydınlatma/i
    ], { optional: true });
  }

  assertSocialLinksVisible(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates([
      '[href*="instagram"]',
      '[href*="facebook"]',
      '[href*="twitter"]',
      '[href*="youtube"]',
      /instagram|facebook|twitter|youtube/i
    ], { optional: true });
  }

  assertAppLinksVisibleIfAvailable(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates([
      '[href*="apps.apple.com"]',
      '[href*="play.google.com"]',
      /app store|google play|mobil uygulama/i
    ], { optional: true });
  }

  assertFooterSectionsVisible(): void {
    cy.scrollTo('bottom', { duration: 300 });
    this.assertVisibleByCandidates([
      'footer section',
      'footer [class*="column"]',
      'footer [class*="group"]',
      /yardım|kurumsal|iletişim/i
    ], { optional: true });
  }
}
