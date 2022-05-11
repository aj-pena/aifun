import React from 'react'

export default function Form({ value, changer, submitter }) {
  return (
        <form onSubmit={submitter}>
          <label className='prompt-label' htmlFor="prompt"> Enter prompt </label>
            <textarea            
            value={value}
            onChange={changer}
            name="prompt"
            id="prompt"
            />
            <button className='btn-submit'> submit </button>
        </form>    
  )
}
