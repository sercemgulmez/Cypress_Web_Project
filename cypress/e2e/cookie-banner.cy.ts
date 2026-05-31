import { HomePage } from '../pages/HomePage';

describe('Cookie and consent banner safe handling', { tags: ['@smoke'] }, () => {
  const homePage = new HomePage();

  it('homepage can handle cookie banner without unsafe form submission', () => {
    homePage.visitHome();
    homePage.handleCookieBannerSafely();
    homePage.assertHomePageLoaded();
  });

  it('cookie handling leaves public search visible', () => {
    homePage.visitHome();
    homePage.handleCookieBannerSafely();
    homePage.assertSearchBoxVisible();
  });
});
