import { CartPage } from '../pages/CartPage';

describe('Cart and checkout boundary smoke', { tags: ['@boundary'] }, () => {
  const cartPage = new CartPage();

  beforeEach(() => {
    cartPage.verifyCartEntryBoundary();
  });

  it('cart or login boundary is documented safely', () => {
    cartPage.assertCheckoutBoundary();
  });

  it('checkout and payment are not submitted', () => {
    cartPage.doNotCheckout();
  });
});
