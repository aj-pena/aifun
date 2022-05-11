import React from 'react'

export default function Responses({ data }) {

  //TODO: erase console.log
  // console.log(data) 
  console.log('Responses rendered')

  const responsesArr = data.map( card => (
    <div className='response-card' key={card.id}>
      <h4 className='response-card-prompt-heading'>prompt:</h4>
      <p className='response-card-prompt-paragraph'> {card.prompt}</p>
      <h4 className='response-card-response-heading'>response:</h4>
      <p className='response-card-response-paragraph'>{card.response}</p>
    </div>
  ))
  return (
    <div className='responses-container'>
      {responsesArr}
    </div>
  )
}
