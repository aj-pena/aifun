import React from 'react'

export default function Form({ value, changer, submitter }) {
  return (
    <div>
        <form onSubmit={submitter}>
            <textarea 
            placeholder='write your prompt here'
            value={value}
            onChange={changer}
            name="prompt"
            />
            <button className='btn-submit'> submit </button>
        </form>
    </div>
  )
}
