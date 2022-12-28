/* eslint-disable no-undef */
it("displays bands when skipping client-side javascript, confirming initial ISR", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove all scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  // find expected bands
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
});
