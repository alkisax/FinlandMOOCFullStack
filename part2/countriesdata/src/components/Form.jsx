const Form = ({ newFilter, handleFilterChange, addFilter }) => {
  return (
    <>
      <span>
        <p style={{ display: "inline" }}>find countries: </p>
        <form style={{ display: "inline" }} onSubmit={addFilter}>
            <input 
              value={newFilter}
              onChange={handleFilterChange}
            />
            <button type="submit">search</button>
        </form>
      </span>
    </>
  )}

export default Form