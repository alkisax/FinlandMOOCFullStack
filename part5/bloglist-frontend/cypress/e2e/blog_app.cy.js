describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',
      username: 'tester',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    // cy.wait(2000)
    cy.contains('username')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login form is visible', function() {
    cy.contains('username').should('exist')
    cy.contains('password').should('exist')
    cy.get('form').should('exist')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('tester')
    cy.get('#password').type('123')
    cy.get('[data-testid="login-button"]').click()
    cy.contains('tester logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('123')
      cy.get('[data-testid="login-button"]').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress tester')
      cy.get('#url').type('http://localhost:5173')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
    })
  })

})