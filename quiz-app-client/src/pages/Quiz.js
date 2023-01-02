import React, { useEffect,useState } from 'react';

import {useParams } from 'react-router-dom';

function Quiz() {
  let { quizHash } = useParams();
  useEffect(() => { getQuiz()}, [])

  let [quizName, setQuizName] = useState("")
 
    async function getQuiz() {
      try {   
        await fetch(`http://localhost:3001/quiz/get/${quizHash}`)
        .then((res)=>res.json())
        .then((response)=>{
          setQuizName(response.message.quizName)
          console.log(quizName)
        })
  
      } catch (error) {
        console.error(error);
      }
    }

  const [started, setStart] = useState(false);

  const [currQues, setCurrQues] = useState({})

  let [responseData, setResData] = useState({
    "emailId":"test5@gmail.com",
    "quizHash":"0npWM_D4K", 
    "questionId":"63b14c69145f4fb97ad03645", 
    "attemptNo":0, 
    "score":0,
    "isQuizCompleted":"false", 
    "userAns": "",
    "viewedQuestionsCount" : 1,
    "difficulty": 5,
    "isCorrect": "na"
  })


  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:3001/user/submit-ans", {
            method: 'post',
            body: JSON.stringify(responseData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((response)=>{
          setResData((prevValue)=>{
            return {
              ...prevValue,
              "attemptNo":response.message.attemptNo, 
              "score": response.message.score,
              "viewedQuestionsCount" : response.message.viewedQuestionsCount,
              "difficulty": response.message.difficulty
            }
          })
          handleStart()
        })
  }

  function handleChange(e){
    setResData((prevValue)=>{
      return {
        ...prevValue,
        "userAns": e.target.value,
      }
    })
  }

 async function handleStart(){ 
  try {
    console.log(responseData.difficulty)
    await fetch(`http://localhost:3001/question/get?quizHash=${quizHash}&difficultyLevel=${responseData.difficulty}`)
    .then((res)=>res.json())
    .then((response)=>{
      setCurrQues(response.message)
      console.log(response.message.description)
    })
    setStart(true);
  } catch (error) {
    console.error(error);
  }
  }

  // function to render the quiz
  function renderQuiz() {
    if(!started){
      return (
        <div>
          <h1>Start the quiz:</h1>
          <button onClick={handleStart}>Start Quiz</button>
        </div>
      )
    }

    // if the quiz is finished, show the results
    if (responseData.difficulty >= 11 || responseData.difficulty<1 || responseData.viewedQuestionsCount > 10) {
      return ( 
        <div>
          <h1>Results:</h1>
          <p>You got {responseData.score} marks</p>
        </div>
      );
    }

    return (
      <div>
        <h1>{`welcome to ${quizName} quiz`}</h1>
        <h1>{currQues.description}</h1>
        <form onSubmit={handleSubmit}>
          <p>{`Difficulty - ${responseData.difficulty}`}</p>
          <p>{responseData.viewedQuestionsCount}</p>
          {currQues.options.map((option) => (
            <label key={option}>
              <input type="radio" name="option" value ={option} onChange={handleChange}/>
              {option}
            </label>
          ))}
          <button type="submit" >Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {renderQuiz()}
    </div>
  );
}

export default Quiz;