import 'bootstrap/dist/css/bootstrap.min.css';

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handlePhoneChange  }) => {
  return (
    <form onSubmit={addPerson}>
      <div className="form-group">
        <label htmlFor="nameInput" className="text-light">Name:</label>
        <input
          id="nameInput"
          type="text"
          className="form-control bg-dark text-light border-light"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneInput" className="text-light">Number:</label>
        <input
          id="phoneInput"
          type="text"
          className="form-control bg-dark text-light border-light"
          value={newNumber}
          onChange={handlePhoneChange}
        />
      </div>
      <button type="submit" className="btn btn-success w-100 mt-3">Add</button>
    </form>
  )
}

export default PersonForm