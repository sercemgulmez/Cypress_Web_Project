import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  assertProductDetailLoaded(): void {
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    this.detectManualBoundary().then((hasBoundary) => {
      if (hasBoundary) {
        cy.log('Product detail execution stopped at a manual-only boundary.');
        return;
      }

      cy.location('href').should('match', /-p-|\/p-/i);
      this.assertNoUnsafePage();
    });
  }

  assertProductTitleVisible(): void {
    this.assertVisibleByCandidates(['h1', '[class*="name"]', '[class*="title"]', /ürün/i]);
  }

  assertPriceOrInfoVisible(): void {
    this.assertVisibleByCandidates(['[class*="price"]', /tl|₺|taksit|kargo/i]);
  }

  assertPriceOrProductInfoVisible(): void {
    this.assertPriceOrInfoVisible();
  }

  assertAddToCartOrFavoriteCtaVisible(): void {
    this.assertVisibleByCandidates([
      /sepete ekle/i,
      /favori/i,
      '[class*="basket"]',
      '[class*="favorite"]'
    ], { optional: true });
  }

  assertSafeCTAsVisible(): void {
    this.assertAddToCartOrFavoriteCtaVisible();
  }

  doNotPurchase(): void {
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  }

  stopBeforeUnsafeAction(): void {
    this.detectManualBoundary().then((hasBoundary) => {
      cy.log(hasBoundary ? 'Manual boundary detected; no unsafe action will be performed.' : 'No unsafe boundary interaction performed.');
    });
    this.doNotPurchase();
  }

  assertGalleryVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="gallery"]',
      '[class*="image"]',
      '[class*="photo"]',
      '[class*="media"]',
      'img[src*="product"]',
      /resim|fotoğraf/i
    ], { optional: true });
  }

  assertBreadcrumbVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="breadcrumb"]',
      'nav[aria-label*="breadcrumb"]',
      /anasayfa\s*[>\/]/i
    ], { optional: true });
  }

  assertSellerInfoVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="seller"]',
      '[class*="merchant"]',
      '[class*="brand"]',
      /satıcı|marka|tarafından/i
    ], { optional: true });
  }

  assertDescriptionOrSpecsVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="description"]',
      '[class*="spec"]',
      '[class*="detail"]',
      /özellik|açıklama|bilgi|detay/i
    ], { optional: true });
  }

  assertShareOrFavoriteButtonVisible(): void {
    this.assertVisibleByCandidates([
      'button[class*="favorite"]',
      'button[class*="share"]',
      '[aria-label*="favori"]',
      '[aria-label*="paylaş"]',
      /favori|paylaş/i
    ], { optional: true });
  }

  assertReviewsSectionVisible(): void {
    this.assertVisibleByCandidates([
      '[class*="review"]',
      '[class*="rating"]',
      '[class*="comment"]',
      /yorum|değerlendirme|puan/i
    ], { optional: true });
  }
}
