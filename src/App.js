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

  React.useEffect( () => {
    // fetch(`https://api.openai.com/v1/engines/${engine_id}/completions`, {
    //   method: "POST",
    //   headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer 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`
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then( res => res.json() )
    // .then( answer => {
    //   console.log(answer.choices)
    // })
  }, [])
  return (
    <div className="App">
      <h1> Fun with AI </h1>
      <Form/>
      <Responses/>
    </div>
  );
}

export default App;
