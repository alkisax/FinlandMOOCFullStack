import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [notStatus, setNotStatus] = useState('')

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
    
      const createBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log("createlog:", createBlog);
      

    } catch (error){
      console.log("error:", error)
    }
  }

  // const handleNewBlog = (event) => {
  //   event.preventDefault()
  //   console.log('Form submitted')
  // }
  

  return (
    <div>
      <Notification message={message} notStatus={notStatus} />

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
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <br />
          <br />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

          <br />
          <NewBlogForm
            handleNewBlog={handleNewBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </div>        
      )}
    </div>
  )
}

export default App