/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
it("skips client-side bundle, confirming data from ISR cache", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove all scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.findAllByText(/2022 apr 1[456]/i).should("have.length.of", 3);
});
