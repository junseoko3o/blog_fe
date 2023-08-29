import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/frame/Layout';
import LoginForm from './components/LoginForm';
import ContentPost from './components/ContentPost';

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
          <Route
            path="/write"
            element={isAuthenticated ? <Layout><ContentPost /></Layout> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    );
  };
export default App;
