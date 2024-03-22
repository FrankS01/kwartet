describe('Kwartet test', () => {
  it('Creates a new game', () => {
    cy.visit('/')
    cy.get('#getStartedButton').click()

    // Assert that url is correct
    cy.url().should('include', '/games');

    cy.get('#newGameButton').click()
    cy.get('#title').type('The coolest game')
    cy.get('#createNewGameButton').click()

    // Assert that the game has been created
    cy.contains('The coolest game').should('exist')


  })
})
