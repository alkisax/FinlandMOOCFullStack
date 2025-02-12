// import { useState, useEffect } from "react"
import { useState } from "react"


const Winner = ({ txt, isPressed }) => {
  if (isPressed === false) {
    console.log("isPressed ", isPressed)
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        {txt}
      </div>
    )
  }
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // console.log(anecdotes.length)
   


  const [selected, setSelected] = useState(0)
  // const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [lastRandomIndex, setLastRandomIndex] = useState(0)
  const [winner, setWinner] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const voteBtn = () => {
    console.log("enter btn")
    let newVotesArr = [...votes]
    console.log("newVotesArr: ", newVotesArr)

    console.log("before", newVotesArr[lastRandomIndex])
    newVotesArr[lastRandomIndex] = newVotesArr[lastRandomIndex] + 1  
    setVotes(newVotesArr)
    console.log("after", newVotesArr[lastRandomIndex])
    setIsPressed(true)
    winnerFinder(newVotesArr)
  }

  const winnerFinder = (newVotesArr) => {
    console.log("enter winnerFinder")
    const winners = []

    console.log("newVotesArr ", newVotesArr)
    const indexedVotes = newVotesArr.map((vote,index) => ({ vote, index }))
    console.log("indexdVotes ", indexedVotes)

    const sorted = indexedVotes.sort((a,b) => b.vote -a.vote)
    console.log()

    for (const el of sorted) {
      if (el.vote === sorted[0].vote)
        winners.push(el)
    }
    console.log("winners: ", winners)
    const randomWinner = winners[Math.floor(Math.random() * winners.length)]

    console.log("anecdotes[randomWinner.index]", anecdotes[randomWinner.index])
    const winTxt = anecdotes[randomWinner.index]
    console.log("winTxt: ", winTxt)
    setWinner(winTxt)
    console.log("winner: ", winner)
  }

  const randomPicker = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    console.log(randomIndex)
    setSelected(randomIndex)
    setLastRandomIndex(randomIndex)
  }

  // useEffect(() => {
  //   randomPicker(); // Select a random anecdote on mount
  // }, []);

    if (isFirstRender) {
      randomPicker()
      setIsFirstRender(false)
    }

  return (
    <div>
      <div>
        {anecdotes[selected]}
        <br />
        <Button text={"vote"} onClick={voteBtn} />
        <Button text={"next anecdote"} onClick={randomPicker} />
        <br />
        <div>
          <Winner txt={winner} isPressed={isPressed} />
        </div>
      </div>
    </div>

  )
}

export default App

    // const zeroArr = []
    // for (let i = 0; i < votes.length; i++) {
    //   if (newVotesArr[i] === undefined) {
    //     zeroArr[i] = 0
    //   }
    // }
    // console.log("zeroArr", zeroArr)
    // newVotesArr = zeroArr

    // console.log("newVotesArr filled with 0: ", newVotesArr)