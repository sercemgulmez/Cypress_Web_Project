import { CampaignPage } from '../pages/CampaignPage';
import { HomePage } from '../pages/HomePage';

describe('Campaign and promotion public smoke', { tags: ['@regression'] }, () => {
  const homePage = new HomePage();
  const campaignPage = new CampaignPage();

  beforeEach(() => {
    homePage.visitHome();
  });

  it('campaign or promotion areas are visible when available', () => {
    campaignPage.assertCampaignAreaVisibleIfAvailable();
  });

  it('campaign interaction remains public and safe when available', () => {
    campaignPage.openSafeCampaignIfAvailable();
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });
});
