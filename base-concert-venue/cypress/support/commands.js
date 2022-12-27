import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");

  const secret = Cypress.env("REVALIDATION_SECRET");

  // request for clear out ISR cache
  // by replacing ISR cache with erased DB
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});
