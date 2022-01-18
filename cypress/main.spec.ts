/// <reference types="cypress" />
// @ts-check
describe('Main', () => {
  it('should display header text', () => {
    cy.visit('/')
    cy.contains('h1', 'The Alchemist\'s Cottage')
  })
})
