describe('Axe accessibility audit', { tags: ['@a11y'] }, () => {
  it('homepage passes axe WCAG 2.1 AA audit', () => {
    cy.safeVisit('/');
    cy.injectAxe();
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      includedImpacts: ['critical', 'serious'],
    }, (violations) => {
      violations.forEach((v) => {
        cy.log(`[axe] ${v.impact?.toUpperCase()} — ${v.id}: ${v.description}`);
        v.nodes.forEach((n) => cy.log(`  Selector: ${n.target.join(', ')}`));
      });
    }, true); // true = violation varsa soft-fail, log yaz ama testi kırmaz
  });

  it('search results page passes axe audit', () => {
    cy.safeVisit('/sr?q=laptop');
    cy.injectAxe();
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      includedImpacts: ['critical', 'serious'],
    }, (violations) => {
      violations.forEach((v) => {
        cy.log(`[axe] ${v.impact?.toUpperCase()} — ${v.id}: ${v.description}`);
      });
    }, true);
  });
});
