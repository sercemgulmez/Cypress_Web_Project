import testData from '../fixtures/test-data.json';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { SearchPage } from '../pages/SearchPage';

describe('Product detail public smoke', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const listingPage = new ProductListingPage();
  const detailPage = new ProductDetailPage();

  beforeEach(() => {
    homePage.visitHome();
    searchPage.searchFor(testData.searchTerms.noRisk);
    searchPage.assertSearchResultsPageLoaded();
    listingPage.openFirstProductSafely();
  });

  it('product detail page opens safely', () => {
    detailPage.assertProductDetailLoaded();
  });

  it('product title and price or public info are visible', () => {
    detailPage.assertProductTitleVisible();
    detailPage.assertPriceOrInfoVisible();
  });

  it('major CTA is visible without completing purchase', () => {
    detailPage.assertAddToCartOrFavoriteCtaVisible();
    detailPage.doNotPurchase();
  });

  it('login, payment, or checkout boundaries are not crossed', () => {
    detailPage.stopBeforeUnsafeAction();
  });
});
