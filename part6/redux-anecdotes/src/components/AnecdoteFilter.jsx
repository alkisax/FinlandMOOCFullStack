/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux'
// import { setFilter } from '../reducers/filterReducer';
import { setFilter } from '../store';


const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    console.log(filter)
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter