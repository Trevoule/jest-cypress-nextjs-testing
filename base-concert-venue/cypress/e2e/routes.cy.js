/* eslint-disable no-undef */
it("displays correct heading when navigating to 'shows' route", () => {
  //   setting route
  cy.visit("/");

  // find 'shows' on the nav bar
  cy.findByRole("button", { name: /shows/i }).click();

  // look for heading of the section
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays correct heading when navigating to 'bands' route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /our illustrious performers/i }).should(
    "exist"
  );
});
