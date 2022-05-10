import Form from './components/Form'
import Responses from './components/Responses'
import './App.css';
import React from 'react';
const engine_id = "text-curie-001"
const data = {
    prompt: "Write a poem about a dog wearing skis",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
}

function App() {
  const [ response, setResponse ] = React.useState( '' )

  React.useEffect( () => {
    fetch(`https://api.openai.com/v1/engines/${engine_id}/completions`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY} `
      },
      body: JSON.stringify(data),
    })
    .then( res => res.json() )
    .then( answer => {
      console.log(answer.choices)
      setResponse( answer.choices[0].text)
    })
  }, [])
  function handleChange(){
    console.log('the text area contents changed')
  }
  return (
    <div className="App">
      <h1> Fun with AI </h1>
      <Form value={response} handler={handleChange}/>
      <Responses/>
    </div>
  );
}

export default App;
