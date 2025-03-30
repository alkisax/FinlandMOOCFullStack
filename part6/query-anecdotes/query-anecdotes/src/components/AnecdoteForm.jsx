import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../createContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newNAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: "ADD", payload: newAnecdote.content }) 
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000) 
    },
    onError: (error) => {
      notificationDispatch({ type: "ERROR", payload: "Too short anecdote, must have length 5 or more" })
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000) 
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNAnecdoteMutation.mutate({ content, votes: 0 })    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
