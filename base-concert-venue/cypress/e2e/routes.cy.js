/* eslint-disable no-undef */
import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

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

it("resets the db", () => {
  // checks if db was reset
  cy.task("db:reset");
});

// dynamic route that present at build time
it("displays correct band name for band route that existed at build time", () => {
  // reset db and go to 'bands' route
  cy.task("db:reset").visit("/bands/1");

  // check for heading content on specified route
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
});

it("displays error for band ID not found in db", () => {
  cy.task("db:reset").visit("/bands/12345");

  // element not specified
  cy.findByText(/Error: band not found/i).should("exist");
});

it("displays error for band ID not found in db", () => {
  cy.task("db:reset").visit("/bands/12345");

  // element not specified
  cy.findByText(/Error: band not found/i).should("exist");
});

it("displays name for band that was not present at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);

  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);

  cy.findByRole("heading", { name: /Avalanche of cheese/i }).should("exist");
});
