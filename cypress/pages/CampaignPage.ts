import { BasePage } from './BasePage';

export class CampaignPage extends BasePage {
  assertCampaignAreaVisibleIfAvailable(): void {
    this.assertVisibleByCandidates([
      '[class*="banner"]',
      '[class*="campaign"]',
      '[class*="slider"]',
      /kampanya|fırsat|indirim|çok satan/i
    ], { optional: true });
  }

  openSafeCampaignIfAvailable(): void {
    this.safeClickIfVisible(/kampanya|fırsat|indirim/i);
    cy.assertNoRealSubmission();
  }
}
