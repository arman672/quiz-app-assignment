import React from 'react';
import { Link } from 'react-router-dom';

function UserHome() {
  return (
    <div>
      <h1>Welcome to My Home Page</h1>
      <a href="#" style={{display: 'block', marginBottom: '10px'}}>About</a>
      <a href="#" style={{display: 'block', marginBottom: '10px'}}>Contact</a>
      <Link to="/quiz">quiz</Link>
    </div>
  );
}

export default UserHome;