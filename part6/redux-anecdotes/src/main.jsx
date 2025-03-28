// import 'bootstrap/dist/css/bootstrap.min.css'
// import { createStore, combineReducers } from 'redux'
// import filterReducer from './reducers/filterReducer'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import { anecdoteReducer, filterReducer, setAnecdotes } from './store'
import { notificationReducer } from './store'
import anecdoteService from './services/anecdotes'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)