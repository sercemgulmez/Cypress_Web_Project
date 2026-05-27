import { HomePage } from '../pages/HomePage';

describe('Homepage public smoke', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('homepage loads successfully', () => {
    homePage.assertHomePageLoaded();
  });

  it('header, search, and footer signals are visible', () => {
    homePage.assertHeaderVisible();
    homePage.assertSearchBoxVisible();
    homePage.assertFooterVisible();
  });

  it('handles cookie banner safely if visible', () => {
    homePage.handleCookieBannerSafely();
    homePage.assertHomePageLoaded();
  });

  it('main public content is visible', () => {
    homePage.assertMainContentVisible();
  });
});
