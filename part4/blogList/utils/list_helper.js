const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  let max = -Infinity
  const topBlog = []
  // part 1 find higher likes
  blogs.forEach(blog => {
    if (blog.likes >= max){
      max = blog.likes
    }
  })
  //part 2 add blogs with max likes to arr
  blogs.forEach(blog => {
    if (blog.likes === max) {
      topBlog.push({
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      })
    }
  })
  return topBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}