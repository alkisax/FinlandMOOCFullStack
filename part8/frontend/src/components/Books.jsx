const Books = ({ booksData, loading }) => {
  if (loading) return <p>Loading...</p>;

  if (!booksData || !booksData.allBooks) return <p>Error loading books</p>;

  const books = booksData.allBooks

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.author.title}</td>
              <td>{a.author.author}</td>
              <td>{a.author.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
