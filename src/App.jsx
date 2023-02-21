import { useEffect, useState } from 'react'
import './App.css'
import Question from './components/Question'
import Loader from './components/Loader'
import {decode} from "html-entities"
import {nanoid} from "nanoid"

function App() {

  //beginning of the quiz
  const [start, setStart] = useState(false)
  const [questions , setQuestions] = useState([])
  const [points, setPoints] = useState(0)
  //used to render the "New Game" button & display score
  const [isFinished, setIsFinished] = useState(false)
  //starts a new Quiz round
  const [newRound, setNewRound] = useState(1)

  const [loader, setLoader] = useState(true)


  
  //effect only runs when a new round is played
  useEffect(()=>{
    window.scroll(0,0)
    //enhance UX, render a custom loader between api calls :)
    setLoader(true)
    setTimeout(() => {
      
      fetch("https://opentdb.com/api.php?amount=5")
          .then(res => res.json())
          .then(data => {
            
            setQuestions(getApiQuestions(data))
            setLoader(false)
          })
    }, 500);

        

  },[newRound])
  
  function startQuiz() {
      setStart(prevState => !prevState)
  }


  //extracts the needed data from API
  function getApiQuestions(rawData) {
    const data = rawData.results.map(obj =>{
      const choices = allChoices(obj.incorrect_answers, obj.correct_answer)
      obj.id = obj.question
      return {
        question: decode(obj.question, {level: "html5"}),
        choices : choices,
        id: nanoid()
      }
    })

    return data
  }



  // since API seperates the correct answer from the incorrect Answer Array
  // and generates a randomised array with each choice bundled in its own object
  function allChoices(incorrectAnswers, correctAnswer) {
    const index = Math.floor(Math.random()* incorrectAnswers.length)
    if(incorrectAnswers.indexOf(correctAnswer) === -1)incorrectAnswers.splice(index,0,correctAnswer)
    const choices = incorrectAnswers
    const all = choices.map(element =>{
      return {
        //api provides the strings in html code
        option: decode(element, {level: "html5"}),
        isHeld: false,
        isCorrectAnswer: element === correctAnswer ? true : false,
        id: nanoid()
      }
    })

    return all
  }


  //highlight the answer selected
  function holdOption(id,e) {

    //parent element (<Question/>) needed to only update 
    // its given options
    const questionEl = e.target.parentElement.id


    setQuestions(oldQuestions => {
      return oldQuestions.map(question =>{
        if (question.id === questionEl) {
          
          const updatedChoices = question.choices.map(choice =>{
            return choice.id === id ? 
            {...choice, isHeld: !choice.isHeld} :
            {...choice, isHeld: false}
          })
          return {...question, choices:updatedChoices}
        }
        else
        return question
      })
    })
  }

  //counts the number of questions answered correctly
  // and updates state accordingly
  function checkAnswers() {
    setIsFinished(true)

    let count = 0

    questions.forEach(question =>{
      const correct = question.choices.filter(choice =>{
        return choice.isHeld === true && choice.isCorrectAnswer === true
      })
      count += correct.length
    })
    setPoints(count)

    //renders the Button dynamically to start a new Round eventually
    //TODO: disable any alterations on the questions
    
  }



  // Reset quiz round 
  function newGame() {
    setPoints(0)
    setIsFinished(prevState => !prevState)
    setNewRound((prevRound)=> prevRound +1)
    
    
  }





  const quizzElements = questions.map(obj=> {
    
    return <Question
          key ={obj.id}
          question = {obj.question}
          choices = {obj.choices}
          id = {obj.id}
          handleHold = {holdOption}
          finished = {isFinished}
          />
  })


  return (
      <main>
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        
        {start ? 
      
      <div className='quiz'>
        <h1>Quiz {newRound}</h1>
        {loader ? <Loader/> :quizzElements }
        
        <div className='quiz-end-container'>
          {isFinished && <p className='quiz-score'>You scored {points}/5 points</p>}
          {isFinished ? 
          <button onClick={newGame} className="quiz-btn blue-accent">New Game</button> : 
          <button onClick={checkAnswers} className="quiz-btn blue-accent">Check answers</button> }
        </div>
        
      </div>
      
          :
    <div className='intro-page'>
      
        <h1 className='intro-page-title'>Quizzical</h1>
        <p className='intro-page-desc'>Welcome to this Silly Goofy ahh Trivia Game</p>
        <button 
        onClick={startQuiz}
        className="intro-page-btn blue-accent"
        >
          Start Quiz
        </button>
    </div>
    }
    <div className="shape-blob two"></div>
    <div className="shape-blob three"></div>
    </main>
    
  )
    
}

export default App
