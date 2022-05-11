import React from 'react'

export default function Responses({ data }) {
// array generated by mapping the data passed by the parent
  const responsesArr = data.map( card => (
    <section className='response-card' key={card.id}>
      <h4 className='response-card-prompt-heading'>prompt:</h4>
      <p className='response-card-prompt-paragraph'> {card.prompt}</p>
      <h4 className='response-card-response-heading'>response:</h4>
      <p className='response-card-response-paragraph'>{card.response}</p>
    </section>
  ))
  return (
    <div className='responses-container'>
      {responsesArr}
    </div>
  )
}
