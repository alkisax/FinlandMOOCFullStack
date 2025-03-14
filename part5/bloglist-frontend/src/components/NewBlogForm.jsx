const NewBlogForm = ({ handleNewBlog, title, author, setTitle, setAuthor, url, setUrl }) => (
  <form onSubmit={handleNewBlog}>
    <div>
      title: 
        <input
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
        autoComplete="title"
      />
    </div>
    <div>
      author: 
        <input
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
        autoComplete="author"
      />
    </div>
    <div>
      url: 
        <input
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
        autoComplete="url"
      />
    </div>
    <br />
    <button type="submit">create</button>
  </form>      
)

export default NewBlogForm