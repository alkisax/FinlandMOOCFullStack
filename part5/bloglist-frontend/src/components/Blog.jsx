import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, handleLike }) => {
  const [viewMore, setViewMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'lightGrey'
  }

  const handleViewClick = () => {
    setViewMore(!viewMore)
  }

  // const handleLike = async (blog) => {
  // ***method got lifted to the main app***
  // }

  const handleDelete = async (blog) => {
    console.log("entered delete")
    const result = window.confirm(`remove blog "${blog.title}" by ${blog.author}`)
    if (!result) {
      console.log("The user canceled the action.")
      return
    }
    console.log("confirmation passed")

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error("Error while deletion:", error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <p id='testerTitleAuthor'>{blog.title}. by: {blog.author}</p>
      </div>

      {!viewMore &&
        <button onClick={handleViewClick}>view</button>
      }

      {/* ? needed */}
      {viewMore &&
        <div>
          <p id='testUrl'>URL: {blog.url}</p>
          <p id='testLikes'>likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like!</button></p>
          <p>user: {blog.user?.username || 'No user'}</p>

          {blog.user && user.username === blog.user.username &&
            <button onClick={() => handleDelete(blog)}>delete</button>
          }

          <button onClick={handleViewClick}>hide</button>
        </div>
      }

    </div>
  )
}

export default Blog