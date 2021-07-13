describe("Register", () => {
  it("should register a new account", () => {
    cy.visit("/register");
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();

    cy.get("[data-testid=name]").type("Test Cypress");
    cy.get("[data-testid=email]").type(`test_cypress_${id}@hotmail.com`);
    cy.get("[data-testid=cep]").type("60874-765");
    cy.get("[data-testid=number]").type("123");
    cy.get("[data-testid=whatsapp]").type("(43) 99999-9999");
    cy.get("[data-testid=password]").type("12345678");
    cy.get("[data-testid=confirm]").type("12345678");
    cy.get("button[data-testid=btn-register]").click();

    //expected
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("should show alert with message this email has account", () => {
    cy.visit("/register");

    cy.get("[data-testid=email]").type("test@hotmail.com").blur();

    //expected
    cy.get(".Toastify__toast-body").should(
      "have.text",
      "Esse e-mail já está cadastrado no sistema"
    );
  });

  it("should show alert with message invalid email", () => {
    cy.visit("/register");

    cy.get("[data-testid=email]").type(`1`).blur();

    //expected
    cy.get(".Toastify__toast-body").should("have.text", "E-mail inválido");
  });

  it("should autocomplete fields in entering the cep", () => {
    cy.visit("/register");

    cy.get("[data-testid=cep]").type("60874-765").blur();

    //expected
    cy.get("[data-testid=uf]").should("have.value", "6");
    cy.get("[data-testid=city]").should("have.value", "756");
  });

  it("should render message required", () => {
    cy.visit("/register");

    //add name and click
    cy.get("[data-testid=name]").type(`test`);
    cy.get("button[data-testid=btn-register]").click();

    //expected 10 required
    cy.get("p[data-testid=text-required]").should("have.length", 10);

    //add email and click again
    cy.get("[data-testid=email]").type("invalidtest@hotmail.com");
    cy.get("button[data-testid=btn-register]").click();

    //expected 9 required
    cy.get("p[data-testid=text-required]").should("have.length", 9);
  });
});
