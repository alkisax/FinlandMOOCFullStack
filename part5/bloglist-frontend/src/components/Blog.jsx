import { useState } from 'react'

const Blog = ({ blog }) => {
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
          <p>likes: {blog.likes} <button>Like!</button></p>
          <p>user: {blog.user?.username || 'No user'}</p> 
          <button onClick={handleViewClick}>hide</button>
        </div>
      }

    </div>
  )
}


export default Blog