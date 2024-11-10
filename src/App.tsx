import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";
import Landing from './pages/Landing';
import Login from './forms/Login'
import Register from './forms/Register'
import Dashboard from './pages/User'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoAccess from "./pages/NoAccess/index";


import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/no-access"
          element={<NoAccess />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App
