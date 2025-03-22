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

  // beforeEach(function() {
  //   cy.request('POST', 'http://localhost:3003/api/login', {
  //     username: 'tester', password: '123'
  //   }).then(response => {
  //     localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
  //     cy.visit('http://localhost:5173')
  //   })
  // })


  it('front page can be opened', function() {
    cy.contains('username')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  it('Login form is shown', function() {
    cy.contains('username').should('exist')
    cy.contains('password').should('exist')
    cy.get('form').should('exist')
  })

  it('succeeds with correct credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('tester')
    cy.get('#password').type('123')
    cy.get('[data-testid="login-button"]').click()
    cy.contains('tester logged in')
  })

  describe ('fails with wrong credentials', function () {
    it('login fails with wrong credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('testerwrong')
      cy.get('#password').type('wrong')
      cy.get('[data-testid="login-button"]').click()

      cy.get('#notification').contains('Wrong')
      cy.get('#notification').should('have.css', 'backgroundColor', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'testerwrong logged in')
    })
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('123')
      cy.get('[data-testid="login-button"]').click()
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress tester')
        cy.get('#url').type('http://localhost:5173')
        cy.get('#create').click()
      })

      it('it can be made not important', function () {
        cy.contains('a blog created by cypress')
        cy.get('#view').click()

        cy.contains('a blog created by cypress')
        cy.get('#hide').click()
      })

      it('user can delete the blog', function() {
        cy.wait(3000)
        cy.contains('new blog').click()
        cy.get('#title').type('delete tester')
        cy.get('#author').type('cypress tester')
        cy.get('#url').type('http://localhost:5173')
        cy.get('#create').click()
        cy.get('#view').click()
        cy.get('#delete').click()
        cy.contains('delete tester').should('not.exist')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress tester')
      cy.get('#url').type('http://localhost:5173')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
      // cy.get('#logout').click()
    })

    it('confirms users can like a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('first blog tester')
      cy.get('#author').type('cypress tester')
      cy.get('#url').type('http://localhost:5173')
      cy.get('#create').click()
      cy.get('#view').click()
      cy.get('#testLikes').click()
      cy.wait(500)
      cy.contains('likes: 1')
      cy.get('#hide').click()
    })

    // it('creates three blogs', function () {
    //   cy.contains('new blog').click()
    //   cy.get('#title').type('first blog tester')
    //   cy.get('#author').type('cypress tester')
    //   cy.get('#url').type('http://localhost:5173')
    //   cy.get('#create').click()
    //   cy.get('#view').click()
    //   cy.get('#testLikes').click()
    //   cy.wait(500)
    //   cy.get('#testLikes').click()
    //   cy.wait(500)
    //   cy.contains('likes: 2')
    //   cy.get('#hide').click()

    //   cy.wait(3000)
    //   cy.contains('new blog').click()
    //   cy.get('#title').type('second blog tester')
    //   cy.get('#author').type('cypress tester')
    //   cy.get('#url').type('http://localhost:5173')
    //   cy.get('#create').click()
    //   cy.get('#view').click()
    //   cy.get('#testLikes').click()
    //   cy.wait(500)
    //   cy.contains('likes: 1') 
    //   // cy.contains('')
    // })


  })

})