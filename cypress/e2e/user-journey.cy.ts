describe("User Journey", () => {
  it("a user can find a course on the home page and complete the courses lessons", () => {
    // Home page - klik op eerste course
    cy.visit("http://localhost:3000")
    cy.getByData("course-0").find("a").contains("Get started").click()
    cy.location("pathname").should("equal", "/testing-your-first-application")

    // Course page - klik op Start Course
    cy.getByData("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/app-install-and-overview"
    )

    // Les 1 - beantwoord quiz en ga naar volgende les
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )

    // Les 2 - beantwoord quiz en ga naar volgende les
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-forms-and-custom-cypress-commands"
    )

    // Les 3 - beantwoord quiz en ga naar volgende les
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-multiple-pages"
    )

    // Les 4 - beantwoord quiz en ga naar volgende les
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/how-to-test-user-journeys"
    )

    // Les 5 (laatste) - beantwoord quiz en klik "Complete course"
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should("eq", "/")
  })
})