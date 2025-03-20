import { useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({ handleNewBlog, setMessage, setNotStatus, blogs, blogFormRef, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // const handleNewBlog = async (event) => {
  //   event.preventDefault()
  //   console.log('Form submitted')

  //   try {
  //     const newBlog = {
  //       title: title,
  //       author: author,
  //       url: url
  //     }

  //     setMessage(`a new blog ${newBlog.title} created by ${newBlog.author}`)
  //     setNotStatus("green")
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 5000)

  //     const createdBlog = await blogService.create(newBlog)
  //     // setBlogs(blogs.concat(createdBlog))
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     console.log("createlog:", createdBlog)

  //     blogFormRef.current.toggleVisibility()

  //     const blogWithUser = {
  //       ...createdBlog,
  //       user: { username: user.username }
  //     }

  //     // Update state with the new blog
  //     setBlogs(blogs.concat(blogWithUser))

  //   } catch (error){
  //     console.log("error:", error)
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }
    handleNewBlog(newBlog) // Call the parent function

    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          id="title"
          placeholder="title"
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
          id="author"
          placeholder="author"
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
          id="url"
          placeholder="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          autoComplete="url"
        />
      </div>
      <br />
      <button id="create" type="submit">create</button>
    </form>
  )
}

export default NewBlogForm