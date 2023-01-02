import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <Link to="/page1"><button>Create Quiz</button></Link>
      </div>
      <div>
        <Link to="/page1"><button>Page 1</button></Link>
      </div>
      <div>
        <Link to="/page1"><button>Page 1</button></Link>
      </div>
    
    </div>
  );
}

export default AdminHome;