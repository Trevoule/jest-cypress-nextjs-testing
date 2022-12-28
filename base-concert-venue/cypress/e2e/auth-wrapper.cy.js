/* eslint-disable no-undef */
it("runs auth flow for successful login to protected reservtions page", () => {
  // visit reservations page for the first show (id=0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check that there's no option purchase
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  // find input by label text and clear it
  // then enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit the form
  // but as we have two buttons "sign in" one in the form and in the nav
  // we need to choose form at first
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // after sign-in we check button for purchase tickets and band name
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("heading", { name: /wandering bunnies/i }).should("exist");

  // check for user email and sign-out buttons in nav
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that sign up does not exist in nav
  cy.findByRole("button", { name: /sign up/i }).should("not.exist");
});

it("runs auth flow for successful login to protected user page", () => {
  // visit user page
  cy.task("db:reset").visit("/user");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check if there's no welcome message
  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  // fail first
  cy.findByLabelText(/email address/i)
    .clear()
    .type("123");

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit the form
  // but as we have two buttons "sign in" one in the form and in the nav
  // we need to choose form at first
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for failure message
  cy.findByText(/sign in failed/i).should("exist");

  // sign in successfully
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_USER_PASSWORD"));

  // submit the form
  // but as we have two buttons "sign in" one in the form and in the nav
  // we need to choose form at first
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for user email and sign-out buttons in nav
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that the user page now shows
  cy.findByRole("heading", { name: /welcome/i }).should("exist");
  cy.findByRole("heading", { name: /your tickets/i }).should("exist");

  // check for user email and sign-out buttons in nav
  cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
    "exist"
  );
  cy.findByRole("button", { name: /sign out/i }).should("exist");
});

it("redirects for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach(($url) => {
      // visiting protected pages from fixtures
      cy.visit($url);

      // check that we see sign in button
      cy.findByRole("main").within(() => {
        cy.findByLabelText(/email address/i).should("exist");
        cy.findByLabelText(/password/i).should("exist");
      });
    });
  });
});
