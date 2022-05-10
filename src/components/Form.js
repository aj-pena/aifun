import React from 'react'

export default function Form(props) {
  return (
    <div>
        <form>
            <textarea 
            placeholder='write your prompt here'
            value={props.value}
            onChange={props.handler}
            name="prompt"
            />
            <button className='btn-submit'> submit </button>
        </form>
    </div>
  )
}
