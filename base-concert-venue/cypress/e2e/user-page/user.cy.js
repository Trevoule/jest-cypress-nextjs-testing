/* eslint-disable no-undef */
it("redirecting to shows page", () => {
  // reset db before test and sign in
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_USER_PASSWORD")
  );

  // visit user page
  cy.visit("/user");

  // find and click "purchase more tickets button"
  cy.findByRole("button", { name: /purchase more tickets/i }).click();

  // redirect to shows
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});
