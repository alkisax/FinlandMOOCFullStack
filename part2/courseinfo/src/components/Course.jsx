const Course = ({ course }) => {
  
  return (
    <div>
        <h1>Web development curriculum</h1>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>
      {course.name}
    </h2>
  )
}

const Content = ({ parts }) => {
  console.log("called content");
  
  return (
    <ul>
      {parts.map(part => {
        return <Part key={part.id} part={part} />
      })}
    </ul>
  )
}

const Part = ({ part }) => {
  console.log("called parts");
  
  return (
    <li>{part.name}: {part.exercises}</li>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, exercise) => sum + exercise.exercises, 0)
  return(
    <p><strong>total of {totalExercises} exercises</strong></p>
  )
}

export default Course