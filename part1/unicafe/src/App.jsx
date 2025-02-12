//1.6-1.11 ok
import { useState } from "react"

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ type, value }) => {
  return(
    <tr>
      <td>{type}</td>
      <td style={{ textAlign: "center" }} >{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral, total, average, positive}) => {
  if (total === 0) {
    return ("No feedback given")
  } else {
    return(
      <>
        <h3>Statistics</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine type={"Good"} value={good} />
            <StatisticLine type={"Neutral"} value={neutral} />
            <StatisticLine type={"Bad"} value={bad} />
            <StatisticLine type={"All"} value={total} />
            <StatisticLine type={"Average"} value={average} />
            <StatisticLine type={"Positive"} value={positive === "pls vote first" ? positive : `${positive} %`} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good +1
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
  }
  const handleBad = () => {
    const updatedBad = bad +1
    setBad(updatedBad)
    setTotal(good + updatedBad + neutral)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral +1
    setNeutral(updatedNeutral)
    setTotal(good + bad + updatedNeutral)  }

  
  const average = total === 0 ? "pls vote first" : (good - bad) / total
  const positive = total === 0 ? "pls vote first" :  (100 * good) / total

  return (
    <div>
      <h1>give feedback</h1>
      <div className="conatiner">
        <div className="row">
          <Button text={"good"} onClick={handleGood} />
          <Button text={"neutral"} onClick={handleNeutral} />
          <Button text={"bad"} onClick={handleBad} />
        </div>
      </div>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
      />

    </div>
  )
}

export default App