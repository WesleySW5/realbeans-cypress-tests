// =============================================================
// RealBeans Shopify Store – Cypress E2E Tests
// =============================================================

const STORE_URL = "https://r1037632-realbeans-2.myshopify.com";
const STORE_PASSWORD = "seedat";

// ── Helper: bypass the Shopify password page ──────────────────
function loginToStore() {
  cy.session("shopify-login", () => {
    cy.visit(STORE_URL);
    cy.get('input[type="password"]').type(STORE_PASSWORD);
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/password");
  });
}

// =============================================================
// 1. PASSWORD PAGE
// =============================================================
describe("Shopify Password Protection", () => {
  it("can enter the store password and access the store", () => {
    cy.visit(STORE_URL);
    cy.get('input[type="password"]').type(STORE_PASSWORD);
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/password");
  });
});

// =============================================================
// 2. HOMEPAGE
// =============================================================
describe("Homepage", () => {
  beforeEach(() => {
    loginToStore();
    cy.visit(STORE_URL);
  });

  it("displays the intro text", () => {
    cy.contains(
      "Since 1801, RealBeans has roasted premium coffee in Antwerp"
    ).scrollIntoView().should("be.visible");
  });

  it("displays the product list on the homepage", () => {
    cy.contains("Roasted coffee beans 5kg").should("exist");
    cy.contains("Blended coffee 5kg").should("exist");
  });
});

// =============================================================
// 3. ABOUT PAGE
// =============================================================
describe("About Page", () => {
  beforeEach(() => {
    loginToStore();
    cy.visit(`${STORE_URL}/pages/about-us`);
  });

  it("displays the history paragraph", () => {
    cy.contains(
      "From a small Antwerp grocery to a European coffee staple"
    ).scrollIntoView().should("be.visible");

    cy.contains("roasted in-house").scrollIntoView().should("be.visible");
    cy.contains("shipped from Antwerp or Stockholm").scrollIntoView().should("be.visible");
  });
});

// =============================================================
// 4. PRODUCT CATALOG PAGE
// =============================================================
describe("Product Catalog Page", () => {
  beforeEach(() => {
    loginToStore();
    cy.visit(`${STORE_URL}/collections/all`);
  });

  it("shows the correct products", () => {
    cy.contains("Blended coffee 5kg").should("exist");
    cy.contains("Roasted coffee beans 5kg").should("exist");
  });

  it("displays 2 products in total", () => {
    cy.contains("2 products").should("be.visible");
  });

  it("shows the correct prices", () => {
    cy.contains("$55.00").should("exist");
    cy.contains("$40.00").should("exist");
  });

  it("sorting by price changes the product order", () => {
    // Default is Alphabetically A-Z: Blended first, then Roasted
    cy.get("#product-grid li").first().should("contain.text", "Blended coffee 5kg");

    // Change sorting to "Price, low to high" via URL
    cy.visit(`${STORE_URL}/collections/all?sort_by=price-ascending`);

    // After sorting: Roasted ($40) should come before Blended ($55)
    cy.get("#product-grid li").first().should("contain.text", "Roasted coffee beans 5kg");
  });
});

// =============================================================
// 5. PRODUCT DETAIL PAGES
// =============================================================
describe("Product Detail Pages", () => {
  context("Roasted coffee beans 5kg", () => {
    beforeEach(() => {
      loginToStore();
      cy.visit(`${STORE_URL}/products/roasted-coffee-beans-5kg`);
    });

    it("displays the correct product title", () => {
      cy.get("h1").should("contain.text", "Roasted coffee beans 5kg");
    });

    it("displays the correct description", () => {
      cy.contains("Our best and sustainable real roasted beans")
        .scrollIntoView()
        .should("be.visible");
    });

    it("displays the correct price", () => {
      cy.contains("$40.00").scrollIntoView().should("be.visible");
    });

    it("displays the product image", () => {
      cy.get("img")
        .filter('[src*="RealBeans"], [src*="realbeans"], [src*="Roasted"], [src*="roasted"]')
        .first()
        .should("exist");
    });
  });

  context("Blended coffee 5kg", () => {
    beforeEach(() => {
      loginToStore();
      cy.visit(`${STORE_URL}/products/blended-coffee-5kg`);
    });

    it("displays the correct product title", () => {
      cy.get("h1").should("contain.text", "Blended coffee 5kg");
    });

    it("displays the correct description", () => {
      cy.contains("RealBeans coffee, ready to brew")
        .scrollIntoView()
        .should("be.visible");
    });

    it("displays the correct price", () => {
      cy.contains("$55.00").scrollIntoView().should("be.visible");
    });

    it("displays the product image", () => {
      cy.get("img")
        .filter('[src*="RealBeans"], [src*="realbeans"], [src*="Blend"], [src*="blend"]')
        .first()
        .should("exist");
    });
  });
});