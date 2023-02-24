import React from 'react';
import ReactDOM from 'react-dom/client';

import { Home, Signup, Login} from './pages';
// import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Navigate } from "react-router-dom"

import { AuthContextProvider } from './contexts/AuthContext';
const currentUser = 0

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/signup" element={currentUser? <Home /> : <Signup />} />
          <Route exact path="/login" element={currentUser? <Home /> : <Login />} />
          <Route exact path="/" element={!currentUser? <Home /> : <Login />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
