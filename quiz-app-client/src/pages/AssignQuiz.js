import React from 'react';

function AssignQuiz() {
  return (
    <form style={{margin: '20px'}}>
      <label style={{display: 'block', marginBottom: '10px'}}>
        Input 1:
        <input type="text" name="input1" style={{width: '100%', height: '30px'}} />
      </label>
      <label style={{display: 'block', marginBottom: '10px'}}>
        Input 2:
        <input type="text" name="input2" style={{width: '100%', height: '30px'}} />
      </label>
      <label style={{display: 'block', marginBottom: '10px'}}>
        Input 3:
        <input type="text" name="input3" style={{width: '100%', height: '30px'}} />
      </label>
      <label style={{display: 'block', marginBottom: '10px'}}>
        Input 4:
        <input type="text" name="input4" style={{width: '100%', height: '30px'}} />
      </label>
      <button type="submit" style={{width: '100%', height: '40px', backgroundColor: '#4CAF50', color: 'white', border: 'none'}}>
        Submit
      </button>
    </form>
  );
}

export default AssignQuiz;