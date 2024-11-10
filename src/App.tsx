import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";
import Landing from './pages/Landing';
import Login from './forms/Login'
import Signup from './forms/SignUp'
import Dashboard from './pages/User'

import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App
