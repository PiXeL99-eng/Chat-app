import React, { useContext } from 'react';

import { Home, Signup, Login} from './pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';

export default function App(){

    const {user} = useContext(AuthContext)
    
    return (

        <Router>
          <AuthContextProvider>
            <Routes>
              
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route exact path="/" element={<Home />} />
    
            </Routes>
          </AuthContextProvider>
        </Router>
    )
}