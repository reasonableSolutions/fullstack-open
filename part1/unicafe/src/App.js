import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => {
    setGood(good+1)
  }

  const neutralHandler = () => {
    setNeutral(neutral+1)
  }

  const badHandler = () => {
    setBad(bad+1)
  }

  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good/all

  return (
    <div>
      <Heading text="give feedback" />
      <Button handler={goodHandler} text="good" /><Button handler={neutralHandler} text="neutral" /><Button handler={badHandler} text="bad" />
      <Heading text = "statistics" />
      <Stat label="good" number={good} />
      <Stat label="neutral" number={neutral} />
      <Stat label="bad" number={bad} />
      <Stat label="all" number={all} />
      <Stat label="average" number={average}/>
      <Stat label="positive" number={positive}/>
    </div>
  )
}

const Heading = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const Stat = (props) => {
  return (
    <p>{props.label} {props.number}</p>
  )
}

export default App