const Books = ({ booksData, loading }) => {
  if (loading) return <p>Loading...</p>;

  if (!booksData || !booksData.allBooks) return <p>Error loading books</p>;

  const books = booksData.allBooks
  console.log('books component, books', books);
  console.log('books component, books', books);
  
  // const books = []

  return (
    <div>
      <h2>books</h2>

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
