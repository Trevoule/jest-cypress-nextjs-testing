/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
const { addReservation } = require("../../lib/features/reservations/queries");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // creating env for cypress
  config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
  // to access within a test function:
  // Cypress.env("REVALIDATION_SECRET")

  // `on` is used to hook into various events Cypress emits
  on("task", {
    "db:reset": () => resetDB().then(() => null),

    // task for generating new band
    addBand: (newBand) => addBand(newBand).then(() => null),

    // add new reservation
    addReservation: (newReservation) =>
      addReservation(newReservation).then(() => null),
  });

  // `config` is the resolved Cypress config
  return config;
};
