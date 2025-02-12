const Numbers = ({ showAllBtn, peopleToShow }) => {
  return(
    <>
      <button onClick={showAllBtn}>Show All</button>
      <ul>
        {peopleToShow.map ((person) => {
          return <li key={person.name}>{person.name}: {person.number}</li>
        })}
      </ul>
    </>
  )
}
export default Numbers