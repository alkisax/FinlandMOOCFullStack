const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // let blogObject = new Blog(helper.initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.initialBlogs[1])
  // await blogObject.save()
})

describe ('testing delete update of a specific blog by id', () => {
  test ('deletes by id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test ('updates blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let changedBlog = blogsAtStart[0]
    const startingLikes = changedBlog.likes
    changedBlog.likes += 1

    await api
      .put(`/api/blogs/${changedBlog.id}`)
      .send(changedBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === changedBlog.id)

    assert.strictEqual(startingLikes + 1, updatedBlog.likes)
  })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  console.log(`              number of entries: ${response.body.length}`)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have "id" and not "_id"', async () =>{
  const response = await api.get('/api/blogs')
  const first = response.body[0]
  assert.strictEqual(first.hasOwnProperty('id'), true)
  assert.strictEqual(first.hasOwnProperty('_id'), false)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  assert(titles.includes('My first test'))
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    "title": "My third test",
    "author": "Johan tester",
    "url": "https://example3.com",
    "likes": 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // console.log('Blogs at end:', blogsAtEnd)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('My third test'))
})

test ('verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlogAuth = {
    "author": "Johan tester",
    "url": "https://example3.com",
    "likes": 1
  }
  const newBlogUrl = {
    "title": "My third test",
    "author": "Johan tester",
    "likes": 1
  }
  const response1 = await api
  .post('/api/blogs')
  .send(newBlogAuth)
  .expect(400)
  assert.strictEqual(response1.body.error, 'Bad Request')

  const response2 = await api
  .post('/api/blogs')
  .send(newBlogUrl)
  .expect(400)
  assert.strictEqual(response2.body.error, 'Bad Request')
})

test ('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    "title": "My third test",
    "author": "Johan tester",
    "url": "https://example3.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()
  const insertedBlog = blogs.find(blog => blog.title === 'My third test')
  assert.strictEqual(insertedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})