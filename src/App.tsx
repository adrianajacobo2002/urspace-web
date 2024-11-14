import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Dashboard from "./pages/User";
import Publicar from "./pages/User/get-started";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoAccess from "./pages/NoAccess/index";
import OwnerMode from "./pages/User/OwnerMode"
import CreatePropiedad from "./pages/User/crear-propiedad";
import Navegar from "./pages/User/navegar";
import ChatPage from "./components/ChatComponents/ChatPage"; // Importa tu componente ChatPage
import TerrenoDetalle  from "./components/TerrenoDetalle";

import "./App.css";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define el tema con las fuentes
const theme = createTheme({
  typography: {
    fontFamily: "Onest, sans-serif",
    h1: { fontFamily: "Righteous, cursive" },
    h2: { fontFamily: "Righteous, cursive" },
    h3: { fontFamily: "Righteous, cursive" },
    h4: { fontFamily: "Righteous, cursive" },
    h5: { fontFamily: "Righteous, cursive" },
    h6: { fontFamily: "Righteous, cursive" },
  },
  palette: {
    background: {
      default: "#04172b",
    },
    text: {
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/no-access" element={<NoAccess />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publicar"
            element={
              <ProtectedRoute>
                <Publicar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner-mode"
            element={
              <ProtectedRoute>
                <OwnerMode />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crear-propiedad"
            element={
              <ProtectedRoute>
                < CreatePropiedad/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/navegar"
            element={
              <ProtectedRoute>
                < Navegar/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                < ChatPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/terreno/:id"
            element={
              <ProtectedRoute>
                < TerrenoDetalle/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      
    </ThemeProvider>
  );
};

export default App;
