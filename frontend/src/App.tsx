import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/Login/LoginForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
