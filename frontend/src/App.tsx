import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/Login';
import Layout from './components/frame/Layout';

  const App = () => {
    const isAuthenticated = true; 
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Layout><Home /></Layout> : <Navigate to="/home" />}
          />
        </Routes>
      </Router>
    );
  };
export default App;
