import { BasePage } from './BasePage';

export class BoundaryPage extends BasePage {
  assertLoginBoundary(): void {
    this.assertVisibleByCandidates([/giriş yap|login|e-posta|şifre/i], { optional: true });
    this.stopSafely();
  }

  assertCartBoundary(): void {
    this.assertVisibleByCandidates([/sepet|cart|giriş yap|ürün/i], { optional: true });
    this.stopSafely();
  }

  assertCheckoutBoundary(): void {
    this.assertVisibleByCandidates([/checkout|ödeme|siparişi tamamla|adres/i], { optional: true });
    this.stopSafely();
  }

  assertPaymentBoundary(): void {
    this.assertVisibleByCandidates([/payment|ödeme|kart|card/i], { optional: true });
    this.stopSafely();
  }

  assertCaptchaBoundary(): void {
    this.assertVisibleByCandidates([/captcha|güvenlik doğrulaması|cloudflare|bot/i], { optional: true });
    this.stopSafely();
  }

  stopSafely(): void {
    cy.assertNoRealSubmission();
    cy.log('Boundary documented. No real form submission, checkout, payment, or bypass attempted.');
  }
}
