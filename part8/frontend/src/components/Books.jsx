import { useState, useEffect } from "react";
import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const Books = ({ loading, loggedIn }) => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  // const skipMeQuery = !loggedIn || !localStorage.getItem('token')

  const { loading: bookLoading, error: bookError, data: booksData } = useQuery(ALL_BOOKS)
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME)

  useEffect(() => {
    if (!meLoading && meData?.me) {
      console.log('Logged in user info (me):', meData.me)
      const favoriteGenre = meData.me.favoriteGenre
      console.log('favoriteGenre: ', favoriteGenre);
      setFavoriteGenre(favoriteGenre) 
      setSelectedGenre(favoriteGenre)    
    }
  }, [loggedIn, meData])

  useEffect (() => {
    if (booksData) {
      const allGenres = []
      booksData.allBooks.forEach(b => {
        if (b.genres) {
          b.genres.forEach(g => {
            if (!allGenres.includes(g)) {
              allGenres.push(g)
            }
        })
        }
      })
      setGenres(allGenres)
    }
  }, [booksData])

  useEffect(() => {
    console.log("genres: ", genres)
  }, [genres])

  if (loading) return <p>Loading...</p>;

  if (!booksData || !booksData.allBooks) return <p>Error loading books</p>;

  const books = booksData.allBooks
  
  // const books = []

  return (
    <div>
      <h2>books</h2>


      <div>
        <div>
          <h3>Genres</h3>
          {genres.map((g) => (
              <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
            ))            
          }
        </div>
        
        {favoriteGenre && favoriteGenre === selectedGenre &&
          <>
            <h4>recommendations</h4>
            <p>books in yout favorite genre <strong>{favoriteGenre}</strong></p>          
          </>
        }

        {selectedGenre && <h4>books in genre {selectedGenre}:</h4>}
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => {
              if (b.genres.includes(selectedGenre)) {
                return (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>


      <br />
      <h3>All books</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
