import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
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

  const handleLike = async (blog) => {
    const addedLikes = blog.likes +1
    const updatedBlog = {
      ...blog,
      likes: addedLikes
    }

    try {
      await blogService.update(blog.id, updatedBlog)

      //update state
      // check for every blog if it matches the id of changed and if it does replace it
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title}. by: {blog.author}</p>
      </div>

      {!viewMore && 
        <button onClick={handleViewClick}>view</button>
      }

{/* ? needed */}
      {viewMore &&
        <div>
          <p>URL: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like!</button></p>
          <p>user: {blog.user?.username || 'No user'}</p> 
          <button onClick={handleViewClick}>hide</button>
        </div>
      }

    </div>
  )
}


export default Blog