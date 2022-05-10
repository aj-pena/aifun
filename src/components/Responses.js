import React from 'react'

export default function Responses(props) {
  const resArr = props.data
  return (
    <div className='response-card'>
      <h4 className='response-card-prompt-heading'>prompt:</h4>
      <p className='response-card-prompt-paragraph'> {props.input}</p>
      <h4 className='response-card-response-heading'>response:</h4>
      <p className='response-card-response-paragraph'>{resArr}</p>
    </div>
  )
}
