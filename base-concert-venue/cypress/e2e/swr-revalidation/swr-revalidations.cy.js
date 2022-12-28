/* eslint-disable no-undef */
import { generateNewReservation } from "../../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const FIFTEEN_SECONDS = ONE_SECOND * 15;
const THIRTY_SECONDS = ONE_SECOND * 30;

it("should refresh the shows page after after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // originally - only one show is sold out
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // buy all tickets for first show (id 0, 10 seats available)
  const reservationId = generateRandomId;
  const newReservation = generateNewReservation({
    reservationId,
    showId: 0,
    seatCount: 10,
  });
  cy.task("addReservation", newReservation);

  // advance the clock one second, less than 30 seconds interval
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // advance clock more than 30 seconds
  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it("should refresh the reservations page after after 15 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  // requires authentication
  // click "sign-in" button (from main page, not nav) to sign in
  // (in an app where user / password weren't pre-filled,
  // would also need to get from env vars and fill)
  cy.findByRole("main").within(() =>
    cy.findByRole("button", { name: /sign in/i }).click()
  );
  // originally - 10 seats left
  cy.findByText(/10 seats left/i).should("exist");

  // the first show from fake data has an ID of 0 and 10 available seats
  const newReservation = generateNewReservation({
    reservationId: 12345,
    showId: 0,
    seatCount: 2,
  });
  cy.task("addReservation", newReservation);

  // advance the clock one second, less than 30 seconds interval
  cy.tick(ONE_SECOND);
  cy.findByText(/10 seats left/i).should("exist");

  // advance clock more than 30 seconds
  cy.tick(FIFTEEN_SECONDS);
  cy.findByText(/8 seats left/i).should("exist");
});
