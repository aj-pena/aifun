import Form from './components/Form'
import Responses from './components/Responses'
import './App.css';
import React from 'react';
// 'Write a poem about a dog wearing skis'
function App() {
  // TODO: erase console.log
  console.log('App mounted')
  // state to remember input from the user and response from API
  const [ cardData, setCardData ] = React.useState(
      {
        prompt:"",
        id: "",
        response:"",
      }  
    )
    // TODO: erase console.log
    // console.log(cardData)

    // state to handle the array of cards that is created from the data passed by App
    const [ cardsArray, setCardsArray ] = React.useState( [])
      // TODO: erase console.log
      console.log('cardsArray:')
      console.log(cardsArray)
  
  // variables to be used in the FETCH call
  const engine_id = "text-curie-001"
  const requestData = {
      prompt: `${cardData.prompt}`,
      temperature: 0.5,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
  }

  // function to handle submit and make FETCH request to the openAI API
  function handleSubmit(event){

    event.preventDefault()
    // fetch call
    fetch(`https://api.openai.com/v1/engines/${engine_id}/completions`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY} `
      },
      body: JSON.stringify(requestData),
    })
    .then( res => res.json() )
    .then( answer => {
       // TODO: erase console.log
      console.log(answer)

      // extracting relevant info from response (answer)
      const newResponse = answer.choices[0].text
      const newResponseId = answer.id

      // using extracted info to update the state
      setCardData( prevCardData => {
        return{
          ...prevCardData,
          id: newResponseId,
          response: newResponse,
        }
      })
      // TODO: erase console.log
      console.log('SetCardData done')

      // using new cardData state to update the cardsArray State
      setCardsArray ( prevCardsArray => {
        return [
           { 
             prompt: cardData.prompt,
             id: newResponseId,
             response: newResponse,
           },
            ...prevCardsArray
           ]
        
    })

    // TODO: erase console.log
    console.log(cardsArray)
    console.log('SetCardsArray done')


    }) // END OF FETCH().THEN.()THEN()     
    
    
     // TODO: erase console.log
    // console.log('I fire once')

  }


  // handles changes to the form input
  function handleChange(event){
    const { name, value } = event.target
    
    setCardData( prevCardData => {
      return{
        ...prevCardData,
        [name]: value
      }
    })
  }
  return (
    <div className="App">
      <h1> Fun with AI </h1>
      <Form value={cardData.prompt} changer={handleChange} submitter={handleSubmit} />
      <Responses data={cardsArray} />
    </div>
  );
}

export default App;
