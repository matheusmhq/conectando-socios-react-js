describe("Login", () => {
  // beforeEach(() => {
  //   cy.login("test@hotmail.com", "12345678");
  // });
  it("should sign in in aplication with credentials", () => {
    cy.visit("/login");

    cy.get("[data-testid=email]").type("test@hotmail.com");
    cy.get("[data-testid=password]").type("12345678");
    cy.get("button[data-testid=btn-sign-in]").click();

    //expected
    cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1&perPage=10`);
  });

  it("should redirect to register page", () => {
    cy.visit("/login");

    cy.get("a[data-testid=btn-register]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/register`);
  });

  it("should show alert with message invalid credentials", () => {
    cy.visit("/login");

    cy.get("[data-testid=email]").type("invalidemail@hotmail.com");
    cy.get("[data-testid=password]").type("1");
    cy.get("button[data-testid=btn-sign-in]").click();

    //expected
    cy.get(".Toastify__toast-body").should(
      "have.text",
      "E-mail ou senha inválidos"
    );
  });

  it("should show alert with message invalid email", () => {
    cy.visit("/login");

    cy.get("[data-testid=email]").type("1").blur();

    //expected
    cy.get(".Toastify__toast-body").should("have.text", "E-mail inválido");
  });

  it("should render message required", () => {
    cy.visit("/login");

    //add email and click
    cy.get("[data-testid=email]").type(`test@hotmail.com`);
    cy.get("button[data-testid=btn-sign-in]").click();

    //expected 1 required only
    cy.get("p[data-testid=text-required]").should("have.length", 1);

    //add password and click again
    cy.get("[data-testid=password]").type("1");
    cy.get("button[data-testid=btn-sign-in]").click();

    //expected 0 required
    cy.get("p[data-testid=text-required]").should("have.length", 0);
  });

  // it("test", () => {
  //   cy.visit("/my-projects/published");

  //   expect(localStorage.getItem("persist:root")).not.null;

  //   cy.log("localStorage");
  //   var test = localStorage.getItem("persist:root");
  //   cy.log(JSON.stringify(test));

  //   cy.contains("Projetos Publicados");
  // });
});
