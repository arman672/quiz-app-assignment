import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateQuiz from "./pages/CreateQuiz";
import AssignQuiz from "./pages/AssignQuiz";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import Quiz from "./pages/Quiz";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CreateQuiz/>}/>
          <Route path="/quiz/:quizHash" element={<Quiz/>}/>

          <Route path="/user" element={<UserHome/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminHome/>}/>
          <Route path="/assign" element={<AssignQuiz/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
