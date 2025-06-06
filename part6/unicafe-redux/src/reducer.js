const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

let newState
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      newState = {
        ... state,
        good: state.good + 1
      }
      state = newState
      return state
    case 'OK':
      newState = {
        ... state,
        ok: state.ok + 1
      }
      state = newState
      return state
    case 'BAD':
      newState = {
        ... state,
        bad: state.bad + 1
      }
      state = newState
      return state
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
