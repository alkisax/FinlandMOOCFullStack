import { useSelector, useDispatch } from 'react-redux'

const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
}

const newAnecdote = (content) => {
  return {
    type: 'NEW',
    payload: {
      content
    }
  }

}
 
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()


  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(newAnecdote(content))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App