import { useState } from "react";
import { Routes, Route, Navigate,Link  } from "react-router-dom";

import { useQuery } from '@apollo/client'
import { FIND_AUTHOR, ALL_AUTHORS, TEST_QUERY, ALL_BOOKS_NO_GENRE } from './queries'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useEffect } from "react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const { loading: authLoading, error: authError, data: authorData } = useQuery(ALL_AUTHORS)
  const { loading: bookLoading, error: bookError, data: booksData } = useQuery(ALL_BOOKS_NO_GENRE)

  const gqlLoading = authLoading || bookLoading
  const gqlError = authError || bookError
  
  useEffect(() => {
    setLoading(gqlLoading)
    if (gqlError) {
      setError(gqlError.message)
    } else {
      setError(false);
    }
  },[gqlLoading, gqlError])


  console.log(booksData);

  return (
    <div>
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
        <Link to="/add">
          <button onClick={() => setPage("add")}>add book</button>        
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/authors" />} />
        <Route path="/authors" element={<Authors authorData={authorData} loading={loading} />} />
        <Route path="/books" element={<Books booksData={booksData} loading={loading}  />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
