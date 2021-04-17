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

  return (
    <div>
      <Heading text="give feedback" />
      <Button handler={goodHandler} text="good" /><Button handler={neutralHandler} text="neutral" /><Button handler={badHandler} text="bad" />
      <Heading text = "statistics" />
      <Stats good={good} neutral={neutral} bad={bad}/>
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

const Statistic = (props) => {
  return (
    <>
      <td>{props.label}</td>
      <td>{props.number}</td>
    </>
  )
}

const Stats = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive = props.good/all

  if (all === 0){
    return (
      <div>No feedback given</div>
    )
  }

  else {
    return (
      <table>
        <tbody>
          <tr>  
            <Statistic label="good" number={props.good} />
          </tr>
          <tr>
            <Statistic label="neutral" number={props.neutral} />
          </tr>
          <tr>  
            <Statistic label="bad" number={props.bad} />
          </tr>
          <tr>
            <Statistic label="all" number={all} />
          </tr>
          <tr>
            <Statistic label="average" number={average}/>
          </tr>
          <tr>
            <Statistic label="positive" number={positive}/>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default App