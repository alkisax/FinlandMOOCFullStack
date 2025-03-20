import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [notStatus, setNotStatus] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Login the user and get the token
      const user = await loginService.login({
        username, password,
      })
      // save user to lockal storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage(`User ${user.username} loged in`)
      setNotStatus("green")
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      // Fetch blogs after logging in
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.error("Login failed:", error)
      setMessage("Wrong username or password")
      setNotStatus("red")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setBlogs([])

    setMessage("User loged out")
    setNotStatus("green")
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
      console.error("Error updating likes:", error)
    }
  }

  return (
    <div>
      <Notification message={message} notStatus={notStatus} />

      {user === null && <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      }
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <br />
          <br />

          {blogs
            .slice() // Create a copy to avoid mutating the original state
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                handleLike={handleLike}
              />
            )}

          <br />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm
              setMessage={setMessage}
              setNotStatus={setNotStatus}
              setBlogs={setBlogs}
              blogs={blogs}
              blogFormRef={blogFormRef}
              user={user}
            />
          </Togglable>

        </div>
      )}
    </div>
  )
}

export default App