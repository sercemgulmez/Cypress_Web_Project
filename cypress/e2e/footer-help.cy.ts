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
});
