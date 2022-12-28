import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");

  const secret = Cypress.env("REVALIDATION_SECRET");

  // request for clear out ISR cache
  // by replacing ISR cache with erased DB
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add("signIn", (email, password) => {
  // note: for many auth system, this would make a POST request to an API
  // but in this case we will go through UI

  // visit sign in page
  cy.visit("/auth/signin");

  // find and fill out the sign in form fields with args
  cy.findByLabelText(/email address/i)
    .clear()
    .type(email);

  cy.findByLabelText(/password/i)
    .clear()
    .type(password);

  // submit form - main section
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check that we get welcome message - otherwise sign in failed
  cy.findByRole("heading", { name: /welcome/i }).should("exist");
});
