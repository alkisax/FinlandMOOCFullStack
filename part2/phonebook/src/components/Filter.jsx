import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({newFilter, handleFilterChange, addFilter}) => {
  return (
    <form onSubmit={addFilter}>
      <div className="form-group">
        <label htmlFor="filterInput" className="text-light">Filter shown with:</label>
        <input
          id="filterInput"
          type="text"
          className="form-control bg-dark text-light border-light"
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-2">Filter</button>
    </form>
  )
}
export default Filter
