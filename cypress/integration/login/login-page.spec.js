describe("Login", () => {
  it("should sign in in aplication with credentials", () => {
    cy.visit("/login");

    cy.get("[data-testid=email]").type("test@hotmail.com");
    cy.get("[data-testid=password]").type("12345678");
    cy.get("button[data-testid=btn-sign-in]").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1&perPage=10`);
  });

  it("should redirect to register page", () => {
    cy.visit("/login");

    cy.get("a[data-testid=btn-register]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/register`);
  });

  it("should show alert with message invalid email", () => {
    cy.visit("/login");

    cy.get("[data-testid=email]").type(`1`).blur();

    //expected
    cy.get(".Toastify__toast-body").should("have.text", "E-mail inválido");
  });
});
