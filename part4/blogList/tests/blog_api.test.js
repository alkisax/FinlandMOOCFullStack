const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

let token;

beforeEach(async () => {
  // await User.deleteMany({})
  await User.deleteMany({})
  // const empty = await User.find({});
  // console.log('Users in DB (expect to be []):', empty)

    const pass = 'sekret'
  const passwordHash = await bcrypt.hash(pass, 10)
  const user = new User({ username: 'root', passwordHash })
    // console.log('Creating user:', user)
    // console.log('Password hash in DB:', user.passwordHash)
  await user.save()
    // console.log('User created successfully') 

    // console.log('SECRET:', process.env.SECRET);
    const users = await User.find({});
    // console.log('Users in DB:', users);

    const loginPayload = { username: 'root', password: pass };
    // console.log('Login request payload:', loginPayload);
  
  const response = await api
    .post('/api/login')
    .send(loginPayload)
    // console.log('Login response status:', response.status);
    // console.log('Login response body:', response.body)
  token = response.body.token
    // console.log('Generated token in beforeEach: ', token)
    // if (response.body.token) {
    //   token = response.body.token;
    //   console.log('Generated token in beforeEach:', token);
    // } else {
    //   console.error('Token not generated. Login response:', response.body);
    // }

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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === changedBlog.id)

    assert.strictEqual(startingLikes + 1, updatedBlog.likes)
  })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
                          .get('/api/blogs')
                          .set('Authorization', `Bearer ${token}`)
  
  // console.log(`              number of entries: ${response.body.length}`)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have "id" and not "_id"', async () =>{
  const response = await api.get('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
  const first = response.body[0]
  assert.strictEqual(first.hasOwnProperty('id'), true)
  assert.strictEqual(first.hasOwnProperty('_id'), false)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
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
  .set('Authorization', `Bearer ${token}`)
  .expect(400)
  assert.strictEqual(response1.body.error, 'Bad Request')

  const response2 = await api
  .post('/api/blogs')
  .send(newBlogUrl)
  .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .expect(201)

  const blogs = await helper.blogsInDb()
  const insertedBlog = blogs.find(blog => blog.title === 'My third test')
  assert.strictEqual(insertedBlog.likes, 0)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    token = response.body.token
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const smallUsername = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(smallUsername)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if pass less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const smallPass = {
      username: 'root2',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(smallPass)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must be longer than 3 chars'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if no pass', async () => {
    const usersAtStart = await helper.usersInDb()

    const noPass = {
      username: 'root3',
      name: 'Superuser',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(noPass)
      .expect(400)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username and password are required'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

test('adding a blog fails with 401 Unauthorized if token is not provided', async () => {
  const newBlog = {
    title: "No Token Blog",
    author: "No Token Author",
    url: "http://notoken.example.com",
    likes: 0
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    // Note: We do not set the Authorization header here.
    .expect(401)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(result.body.error, 'token missing');
});

after(async () => {
  await mongoose.connection.close()
})