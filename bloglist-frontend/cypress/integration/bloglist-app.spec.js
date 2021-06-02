/// <reference types="cypress" />

describe('BlogList App Test', () => {
  const user = {
    username: 'testUser',
    name: 'Test User',
    password: 'secretTestPass'
  }
  describe('Login through UI', () => {
    before(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
    it('login page displayed', () => {
      cy.get('html').should('contain', 'Login to Application')
    })
    it('login to application', () => {
      cy.get('input[type=text]').type(user.username)
      cy.get('input[type=password]').type(user.password)
      cy.get('button[type=submit]').click()
      cy.get('html').should('contain', `${user.username} is logged in`)
    })
  })
  describe('Login with invalid credentials', () => {
    before(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
    it('login to application with invalid credentials', () => {
      cy.get('input[type=text]').type('username')
      cy.get('input[type=password]').type('password')
      cy.get('button[type=submit]').click()
      cy.get('.error').should('contain', 'Sorry! Credentials not found. Try again')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain','username is logged in')
    })
  })
})