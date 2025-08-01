import { useState } from 'react'
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/client'
import { LOGIN, ME, ALL_BOOKS, ALL_GENRES } from '../queries'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient()
  const navigate = useNavigate()

  const [getMe, { data: meData, loading: meLoading }] = useLazyQuery(ME)
  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }, { query: ALL_BOOKS }, { query: ALL_GENRES }],
  })

  const submit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({ variables: { username, password } })
      const token = data.login.value
      localStorage.setItem('token', token)
      setToken(token)

      await client.resetStore() // ✅ Clear cache and refetch ME, ALL_BOOKS, etc.
      getMe() // ✅ manually refetch user info after cache reset

      navigate('/')
      window.location.reload()  // BAD PRACTISE but tryed everything, setFlag, client.resetStore, useLazyQuery...
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
