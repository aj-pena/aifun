import Form from './components/Form'
import Responses from './components/Responses'
import './App.css';
import React from 'react';

function App() {
  
  // state to remember input from the user and response from API
  const [ cardData, setCardData ] = React.useState(
      {
        prompt:"",
        id: "",
        response:"",
      }  
    )
    // state to handle an array of objects that will be used to display the responses in a list
    //  in the <Responses/> component
    const [ cardsArray, setCardsArray ] = React.useState( localStorage.getItem("cards") ? localStorage.getItem('cards') : [])
   
  // variable and request object to be used in the FETCH call
  const engine_id = "text-curie-001"
  const requestData = {
      prompt: `${cardData.prompt}`,
      temperature: 0.5,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
  } 

  // function that handles changes to the textarea and saves the changes in state cardData
  function handleChange(event){
    const { name, value } = event.target
    
    setCardData( prevCardData => {
      return{
        ...prevCardData,
        [name]: value
      }
    })
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
      // using extracted info to update the cardsArray State while preserving previous info
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
      // retrieves saved data from local storage and parses it to convert to JavaScript Array
      let savedCards = JSON.parse( localStorage.getItem('cards') ) 
      // TODO: erase console.log
      console.log( savedCards )
      // Checks if there is saved data
      if( savedCards){
          // adds new card to the beginning of array 
        savedCards.unshift( {
          prompt:cardData.prompt,
          id: newResponseId,
          response: newResponse,
        }
        )
        // saves updated array to local storage
        localStorage.setItem( 'cards', JSON.stringify( savedCards ) )

      }else {
        // If there is no saved data, creates array with first entry
        savedCards = [ {
          prompt:cardData.prompt,
          id: newResponseId,
          response: newResponse,
        }]
      }
      // saves new array to local storage
      localStorage.setItem( 'cards', JSON.stringify( savedCards ) )

    }) // END OF FETCH().THEN.()THEN()  

  }

  return (
    <div className="App">
      <h1> Fun with AI </h1>
      {/* Form component receives the prompt to update display and two functions, one to handle
      changes to textarea and one to handle the form submission */}
      <Form value={cardData.prompt} changer={handleChange} submitter={handleSubmit} />
      {/* Responses component receives the cards array, which is a state, and will be used to map
      and display the cards with the responses, from newest to oldest */}
      <Responses data={cardsArray} />
    </div>
  );
}

export default App;
