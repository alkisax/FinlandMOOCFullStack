import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './createContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return `${action.payload} added`
    case "VOTE":
      return `voted for ${action.payload}`
    case "CLEAR":
      return ''
    case "ERROR":
      return action.payload
    default:
      return state
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const anecdotes = result.data

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation ({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notificationDispatch({ type: "VOTE", payload: anecdote.content }) 
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1 })
  }

  if (result.isLoading) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>

  )
}

export default App
