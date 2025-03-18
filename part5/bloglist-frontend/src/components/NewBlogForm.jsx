import { useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({ setMessage, setBlogs, setNotStatus, blogs, blogFormRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log('Form submitted')

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      setMessage(`a new blog ${newBlog.title} created by ${newBlog.author}`)
      setNotStatus("green")
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      const createdBlog = await blogService.create(newBlog)
      // setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log("createlog:", createdBlog)

      blogFormRef.current.toggleVisibility()

      const blogWithUser = {
        ...createdBlog,
        user: { username: user.username }
      }

      // Update state with the new blog
      setBlogs(blogs.concat(blogWithUser))

    } catch (error){
      console.log("error:", error)
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          autoComplete="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          autoComplete="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          autoComplete="url"
        />
      </div>
      <br />
      <button type="submit">create</button>
    </form>
  )
}


export default NewBlogForm