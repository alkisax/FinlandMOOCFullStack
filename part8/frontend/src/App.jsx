import { useState } from "react";
import { Routes, Route, Navigate,Link  } from "react-router-dom";

import { useQuery } from '@apollo/client'
import { FIND_AUTHOR, ALL_AUTHORS, TEST_QUERY, ALL_BOOKS_NO_GENRE } from './queries'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login'
import { useEffect } from "react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const { loading: authLoading, error: authError, data: authorData } = useQuery(ALL_AUTHORS)
  const { loading: bookLoading, error: bookError, data: booksData } = useQuery(ALL_BOOKS_NO_GENRE)

  const gqlLoading = authLoading || bookLoading
  const gqlError = authError || bookError

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      setLoggedIn(true)
    }
    console.log('Token state set to:', token)
    console.log('loged in: ', loggedIn);  
  }, [loggedIn, token])

  const logout = () => {
    setToken(null)
    setLoggedIn(false)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    setLoading(gqlLoading)
    if (gqlError) {
      setError(gqlError.message)
    } else {
      setError(false);
    }
  },[gqlLoading, gqlError])

  useEffect(() => {
    if (booksData) console.log('Books:', booksData)
    if (authorData) console.log('Authors:', authorData)
  }, [booksData])

  return (
    <div>

      {token ? (
        <button onClick={logout}>logout</button>
      ) : (
        <Link to="/login"><button>login</button></Link>
      )}

      {loading && (
        <div>Loading...</div>
      )}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div>
        <Link to="/authors">
          <button onClick={() => setPage("authors")}>authors</button>        
        </Link>
        <Link to="/books">
          <button onClick={() => setPage("books")}>books</button>        
        </Link>
        {loggedIn && 
          <Link to="/add">
            <button onClick={() => setPage("add")}>add book</button>        
          </Link>        
        }

        {!loggedIn ? 
          (<Link to="/login">
            <button>login</button>
          </Link>) :
          (<button onClick={logout}>logout</button>)        
        }

      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/authors" />} />
        <Route path="/authors" element={<Authors authorData={authorData} loading={loading} loggedIn={loggedIn} />} />
        <Route path="/books" element={<Books booksData={booksData} loading={loading} />} />
        <Route path="/add" element={<NewBook loggedIn={loggedIn} setError={setError} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
