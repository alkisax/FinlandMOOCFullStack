const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
    if (!blog.title || !blog.url) {
      return res.status(400).json({ error: 'Bad Request' })
    }
    if (!blog.likes) {
      blog.likes = 0
    }

  const result = await blog.save()
  res.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog =   {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog, { new: true }
  )
  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.json(updatedBlog)
})

module.exports = blogRouter