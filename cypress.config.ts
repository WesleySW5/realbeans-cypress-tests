import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "gwj2xw",
  e2e: {
    baseUrl: "https://r1037632-realbeans-2.myshopify.com",
    specPattern: "cypress/e2e/shopify-store.cy.ts",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});