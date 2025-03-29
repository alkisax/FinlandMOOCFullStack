import { useDispatch, useSelector } from 'react-redux'
import { setNotification, voteAnecdote, clearNotification } from '../store'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const filteredAnecdotes = filter
    ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes;
  
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))  //6.18 **1**  Vote action gets dispatched from the component
    dispatch(setNotification(`You voted for: ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  return (
    <>
      <h2>Anecdotes</h2>
      {[...filteredAnecdotes]
        .slice()
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
    </>

  )



}

export default AnecdoteList