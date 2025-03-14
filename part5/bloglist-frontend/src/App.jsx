import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

      // Fetch blogs after logging in
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setBlogs([]) 
  }

  return (
    <div>

      {user === null && <LoginForm 
        handleLogin={handleLogin} 
        username={username} 
        password={password} 
        setUsername={setUsername} 
        setPassword={setPassword}
      />}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <span>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </span>
          <br />
        </div>
      )}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App