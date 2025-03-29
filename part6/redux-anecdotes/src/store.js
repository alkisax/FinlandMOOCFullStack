/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from './services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteAnecdote (state, action){      
    //   const id = action.payload
    //   const anecdoteToChange = state.find(n => n.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes +1
    //   }
    //   return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    // },
    updateAnecdote(state, action) { // 6.18 **4** Redux updates the state
      const updatedAnecdote = action.payload
      return state.map(a =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    // newAnecdote (state, action){
    //   const anecdote = action.payload.content
    //   const newAnecdote = {
    //     content: anecdote,
    //     id: getId(),
    //     votes: 0
    //   }
    //   return [...state, newAnecdote]
    // }
  },
})

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {  // 6.18 **2** Redux Thunk handles the async logic in voteAnecdote
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = await anecdotesService.voteAnecdote(anecdoteToVote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export const { setFilter } = filterSlice.actions
export const { setNotification, clearNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
export const anecdoteReducer = anecdoteSlice.reducer
export const filterReducer = filterSlice.reducer