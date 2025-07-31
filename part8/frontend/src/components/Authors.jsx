import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ authorData, loading }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (loading) return <p>Loading...</p>;
  if (!authorData || !authorData.allAuthors) return <p>Error loading authors</p>

  const authors = authorData.allAuthors

  const submitBirthyear = (event) => {
    event.preventDefault();

    console.log('update Author:', name + ' born:', born);
    
    const setBornTo = Number(born)
    updateAuthor({ variables: {name, setBornTo} })

    setName('')
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h2><strong>Set birthyear</strong></h2>

        <form onSubmit={submitBirthyear}>
          <div style={{ display: 'block' }}>
            <label>name: </label>
            <select
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              <option value="" disabled>
                Select author
              </option>
              {authors.map((auth) => {
                return (
                  <option key={auth.id} value={auth.name}>
                    {auth.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div style={{ display: 'block' }}>
            <label>born: </label>
            <input 
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />            
          </div>
          <button type="submit">
            submit
          </button>
        </form>


    </div>
  )
}

export default Authors
