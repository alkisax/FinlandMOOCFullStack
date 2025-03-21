describe('Note app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    // cy.wait(2000)
    cy.contains('username')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
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
    cy.get('#username').type('alkisax')
    cy.get('#password').type('123')
    cy.get('[data-testid="login-button"]').click()
    cy.contains('alkis logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('alkisax')
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