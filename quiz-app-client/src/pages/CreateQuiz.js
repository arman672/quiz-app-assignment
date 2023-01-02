import React, { useState } from 'react';

function CreateQuiz() {
  const [question, setQuestion] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputs, setInputs] = useState([]);

  const [quizHash, setQuizHash] = useState("");

  const [created, setCreated] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const [quizData, setQuizData] = useState({
    "quizName": "test",
    "duration": 60,
    "createdBy": "admin"
  });

  const [ans, setAns] = useState("");

  const handleOptionChange = event => {
    let val = event.target.value
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputs([...inputs, input1, input2, input3, input4]);
    let createdBy = quizData.createdBy
    try {
      await fetch("http://localhost:3001/question/add", {
        method: 'post',
        body: JSON.stringify({
          "quizHash":quizHash,
          "description":question,
          "options":inputs,
          "correctAns": [ans],
          "difficultyLevel":difficulty,
          "createdBy":createdBy
      }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((res)=>res.json())
      .then((response)=>{ 
        console.log(response.message)
        setQuestionCount(questionCount+1)
        
      })
      setCreated(true);
    } catch (error) {
      console.error(error);
    }
    
  };

  async function handleCreated(){ 
    try {
      await fetch("http://localhost:3001/quiz/create", {
        method: 'post',
        body: JSON.stringify(quizData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((res)=>res.json())
      .then((response)=>{ 
        setQuizHash(response.message.quizHash)
      })
      setCreated(true);
    } catch (error) {
      console.error(error);
    }
    }

    function handleQuizData(e){
     
      const { name, value } = e.target;
      console.log(name)

      setQuizData(prevData => {
        return {
          ...prevData,
          [name]: value
        };
      });
    }

   
  if(!created){
    return (
      <div>
        <h1>Create a quiz and add questions</h1>

        <label>
          Quiz Name :
          <input type="text" name= "quizName" value={quizData.quizName} onChange={handleQuizData} />
        </label>

        <br/>
        <br/>

        <label>
          Duration :
          <input type="Number" name= "duration" value={quizData.duration} onChange={handleQuizData} />
        </label>

        <br/>
        <br/>

        <label>
          CreatedBy :
          <input type="text" name= "createdBy" value={quizData.createdBy} onChange={handleQuizData} />
        </label>

        <br/>
        <br/>
        <br/>

        <button onClick={handleCreated}>Create Quiz</button>
      </div>
    )
  }


  if (questionCount >= 10) {
    return ( 
      <div>
        <h1>Quiz successfully created:</h1>
        <p>Link for the Quiz {quizHash}</p>
      </div>
    );
  }

  return (
   <>
    <h3>Add questions for the Quiz</h3>
    <h4>and select the correct ans</h4>
    <form onSubmit={handleSubmit}>
    <label>
        Question:
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
      </label>
      <br/>
      <br/>
      <label>
        Input 1:
        <input type="text" value={input1} onChange={e => setInput1(e.target.value)} />
        <input
          type="radio"
          value="1"
          checked={selectedOption === "1"}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Input 2:
        <input type="text" value={input2} onChange={e => setInput2(e.target.value)} />
        <input
          type="radio"
          value="2"

          checked={selectedOption === "2"}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Input 3:
        <input type="text" value={input3} onChange={e => setInput3(e.target.value)} />
        <input
          type="radio"
          value="3"
          checked={selectedOption === '3'}
          onChange={handleOptionChange}
        />
      </label>
      <br />
      <label>
        Input 4:
        <input type="text" value={input4} onChange={e => setInput4(e.target.value)} />
        <input
          type="radio"
          value="4"
          checked={selectedOption === '4'}
          onChange={handleOptionChange}
        />
      </label>

      <br />
      <br />

      <label>
        Difficulty:
        <input type="Number" value={difficulty} onChange={e => setDifficulty(e.target.value)} />
      </label>

      <br />
      <br />

      <button type="submit">Save</button>
    </form>
    </>
  );
}

export default CreateQuiz