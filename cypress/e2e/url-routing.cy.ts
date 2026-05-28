describe('URL routing public smoke', () => {
  it('homepage direct URL loads correctly', () => {
    cy.safeVisit('/');
    cy.location('hostname').should('include', 'trendyol.com');
    cy.get('body').should('be.visible').and('not.be.empty');
  });

  it('search URL with query param loads results page', () => {
    cy.safeVisit('/sr?q=laptop');
    cy.location('href').should('match', /q=laptop/i);
    cy.get('body').should('be.visible');
  });

  it('electronics category URL loads a public page', () => {
    cy.safeVisit('/elektronik');
    cy.get('body', { timeout: 20000 }).should('be.visible').and('not.be.empty');
    cy.assertNoRealSubmission();
  });

  it('unknown URL does not navigate to checkout or unsafe page', () => {
    cy.safeVisit('/this-page-probably-does-not-exist-xyz123');
    cy.get('body').should('be.visible');
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis/i);
  });

  it('URL stays on trendyol.com domain throughout navigation', () => {
    cy.safeVisit('/');
    cy.location('hostname').should('include', 'trendyol.com');
    cy.safeVisit('/sr?q=moda');
    cy.location('hostname').should('include', 'trendyol.com');
  });

  it('URL does not contain unsafe path segments after homepage visit', () => {
    cy.safeVisit('/');
    cy.location('href').should('not.match', /checkout|payment|odeme|siparis|hesabim/i);
  });
});
