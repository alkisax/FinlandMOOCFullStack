import { useDispatch } from 'react-redux'
import { appendAnecdote , setNotification, clearNotification } from '../store'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (event) => {    
    event.preventDefault()
    const content = event.target.content.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote (newAnecdote))
    event.target.content.value = ''

    dispatch(setNotification(`You created anecdote: ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm