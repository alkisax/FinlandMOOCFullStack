import 'bootstrap/dist/css/bootstrap.min.css';

const Numbers = ({ showAllBtn, peopleToShow, deleteBtn }) => {
  return (
    <>
      <button onClick={showAllBtn} className="btn btn-info w-100 mb-3">
        Show All
      </button>
      <ul className="list-group">
        {peopleToShow.map((person) => {
          return (
            <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
              {person.name}: {person.number}
              <button
                onClick={() => deleteBtn(person.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default Numbers