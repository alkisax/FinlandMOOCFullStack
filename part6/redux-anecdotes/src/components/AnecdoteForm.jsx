import { useDispatch } from 'react-redux'
import { newAnecdote } from '../store'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = (event) => {    
    event.preventDefault()
    const content = event.target.content.value
    dispatch(newAnecdote({ content }))
    event.target.content.value = ''
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