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

const mostBlogs = (blogs) => {
  // create a list of object with authors/blogs
  const auth_blog = []
  blogs.forEach(blog => {
    let found = false
    auth_blog.forEach(entry => {
      if (entry.author === blog.author){
        entry.blogs += 1
        found = true
      }
    })
    if (!found) {
      auth_blog.push({
        author: blog.author,
        blogs: 1
      })
    }
  })

  //create a list with the top author (or more if same no)
  let max = -Infinity
  const topAuth = []
    // part 1 find higher no of blogs
    auth_blog.forEach(auth => {
      if (auth.blogs >= max){
        max = auth.blogs
      }
    })
    //part 2 add blogs with max likes to arr
    auth_blog.forEach(auth => {
      if (auth.blogs === max) {
        topAuth.push({
          author: auth.author,
          blogs: auth.blogs
        })
      }
    })
    return topAuth[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}