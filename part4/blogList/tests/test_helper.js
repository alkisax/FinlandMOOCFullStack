const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "My first test",
    "author": "John tester",
    "url": "https://example.com",
    "likes": 5
  },
  {
    "title": "My second test",
    "author": "Johan tester",
    "url": "https://example2.com",
    "likes": 7
  },
  {
    "title": "My fourth test",
    "author": "Johan tester",
    "url": "https://example4.com",
    "likes": 0
  }
]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}