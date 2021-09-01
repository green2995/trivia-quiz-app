import React from 'react'
import {useLocation} from "react-router-dom"
import TriviaChat from '../Components/specific/TriviaChat';

const Trivia = () => {
  const query = new URLSearchParams(useLocation().search);
  const category = query.get("category");
  
  return (
    <div>
      <TriviaChat/>      
    </div>
  )
}

// type SearchQuery = {
//   category: string
// }

export default Trivia
