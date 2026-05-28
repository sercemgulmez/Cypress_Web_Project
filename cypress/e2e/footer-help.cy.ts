import { FooterPage } from '../pages/FooterPage';
import { HomePage } from '../pages/HomePage';

describe('Footer and help/legal public smoke', () => {
  const homePage = new HomePage();
  const footerPage = new FooterPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('footer is visible', () => {
    footerPage.assertFooterVisible();
  });

  it('safe help or legal link opens public informational content', () => {
    footerPage.assertFooterVisible();
    footerPage.openSafeHelpOrLegalLink();
    footerPage.assertHelpOrLegalPageLoaded();
  });

  it('legal links are visible in footer', () => {
    footerPage.assertLegalLinksVisible();
  });

  it('social media links are visible if available', () => {
    footerPage.assertSocialLinksVisible();
  });

  it('mobile app download links are visible if available', () => {
    footerPage.assertAppLinksVisibleIfAvailable();
  });

  it('footer section groupings are visible if available', () => {
    footerPage.assertFooterSectionsVisible();
  });

  it('footer is also visible from search results page', () => {
    cy.safeVisit('/sr?q=kitap');
    footerPage.assertFooterVisible();
  });
});
