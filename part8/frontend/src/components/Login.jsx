import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({ variables: { username, password } })
      const token = data.login.value
      // console.log('Token received from backend:', token)
      localStorage.setItem('token', token)
      // console.log('Token stored in localStorage:', localStorage.getItem('token'))
      setToken(token)
      navigate('/') 
    } catch (err) {
      console.error('Login error:', err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
