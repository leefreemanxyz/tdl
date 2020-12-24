describe("search", () => {
  it("searches for a user and delivers a list of results", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("leefreemanxyz");
    cy.get('[data-testid="user-result"]').its("length").should("be.gt", 0);
    cy.get('[data-testid="total-count"]')
      .invoke("text")
      .then(parseFloat)
      .should("be.gt", 0);
  });

  it("paginates next and previous", () => {
    cy.visit("/?q=react");
    cy.get('[data-testid="current-page"]').contains(1);
    cy.get(".MuiPagination-ul > :last-child()").click();
    cy.get('[data-testid="current-page"]').contains(2);
    cy.get(".MuiPagination-ul > :first-child()").click();
    cy.get('[data-testid="current-page"]').contains(1);
  });

  it("displays a UserCard with relevant details", () => {
    cy.visit("/?q=leefreeman");
    cy.get('[data-testid="username-leefreemanxyz"]').contains("leefreemanxyz");
    cy.get('[data-testid="github-leefreemanxyz"]').should(
      "have.attr",
      "href",
      "https://github.com/leefreemanxyz"
    );
    cy.get('[data-testid="twitter-leefreemanxyz"]').should(
      "have.attr",
      "href",
      "https://twitter.com/leefreemanxyz"
    );
    cy.get('[data-testid="personal-leefreemanxyz"]').should(
      "have.attr",
      "href",
      "https://leefreeman.xyz"
    );
  });
});
