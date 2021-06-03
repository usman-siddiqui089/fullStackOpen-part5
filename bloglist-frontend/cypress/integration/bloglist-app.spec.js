/// <reference types="cypress" />

describe('BlogList App Test', () => {
  const user = {
    username: 'testUser',
    name: 'Test User',
    password: 'secretTestPass'
  }
  const credentials = {
    username: user.username,
    password: user.password
  }
  const blog = {
    title: 'first blog',
    author: 'anonymous',
    url: 'www.testBlog.com'
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

  describe('New Blog for Logged In User', () => {
    before(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login(credentials)
    })

    it('create new blog', () => {
      cy.contains('Create New Blog').click()
      cy.get('input[name=Title]').type(blog.title)
      cy.get('input[name=Author]').type(blog.author)
      cy.get('input[name=Url]').type(blog.url)
      cy.contains('Add').click()
      cy.get('.success').should('contain', `a new blog ${blog.title} by ${blog.author} added successfully`)
      cy.get('html').should('contain', `${blog.title}`)
    })

    it('User can like blog', () => {
      cy.contains('View Details').click()
      cy.contains('Like').click()
      cy.get('.blogLikes').should('contain', 1)
    })

    it('Only creator can remove blog', () => {
      cy.contains('Remove Blog').click()
      cy.get('.success').should('contain', `${blog.title} by ${blog.author} removed successfully!`)
    })
  })

  describe('Most Likes Blog', () => {
    let likesArr = []
    before(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login(credentials)
      for(let i=0; i<4; i++){
        const rand = Math.floor(Math.random() * 100)
        cy.createBlog({
          title: `blog ${i}`,
          author: `Anon#${i}`,
          url: `www.blog${i}.com`,
          likes: rand
        })
      }
    })
    it('fetch blog likes based on order', () => {
      cy.get('html').should('contain', 'blog 1')
      for(let i=0; i<4; i++){
        cy.contains(`blog ${i}`).parent().contains('View Details').click()
        cy.wait(2000)
      }
      for(let i=0; i<4; i++){
        cy.get('.blogLikes > #likesValue').eq(i).invoke('text').then((text) => {
          const val = text
          likesArr.push(parseInt(val))
        })
      }
    })
    it('verify blogs order based on likes', () => {
      for(let i=0; i<likesArr.length-1; i++){
        expect(likesArr[i]).to.be.greaterThan(likesArr[i+1])
      }
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