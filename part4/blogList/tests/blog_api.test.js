const { test, after, beforeEach  } = require('node:test')
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


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
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

after(async () => {
  await mongoose.connection.close()
})