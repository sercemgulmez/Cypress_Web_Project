describe("Cypress example app", () => {
  it("loads the home page", () => {
    cy.visit("/");

    cy.contains("Kitchen Sink").should("be.visible");
  });
});
