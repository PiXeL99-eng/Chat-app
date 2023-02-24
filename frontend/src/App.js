import React, { useContext } from 'react';

import { Home, Signup, Login} from './pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom"

import { AuthContext, AuthContextProvider } from './contexts/AuthContext';

export default function App(){

    const {user} = useContext(AuthContext)
    
    return (

        <Router>
          <AuthContextProvider>
            <Routes>
              
                <Route path="/signup" element={user? <Navigate to='/' /> : <Signup />} />
                <Route path="/login" element={user? <Navigate to='/' /> : <Login />} />
                <Route exact path="/" element={user? <Home /> : <Navigate to='/login' />} />
    
            </Routes>
          </AuthContextProvider>
        </Router>
    )
}