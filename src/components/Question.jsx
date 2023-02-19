import React from "react";
import Option from "./Option";

export default function Question(props) {
  const {question, choices, id, handleHold, finished} = props


    return(
          <div className="question-card">
            <h4 className="question-card-title">{question}</h4>
            <div className="choices-container" id={id}>
              {choices.map(obj =>{

              return <Option 
                key = {obj.id}
                option = {obj.option}
                isHeld = {obj.isHeld}
                isCorrect = {obj.isCorrectAnswer}
                holdOption = {(e)=>handleHold(obj.id,e)}
                finished = {finished}
            />
            })}
            </div>
          
          </div>
          
          
    
    )
}