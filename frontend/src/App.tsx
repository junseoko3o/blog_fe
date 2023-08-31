import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/frame/Layout';
import LoginForm from './components/LoginForm';
import ContentPost from './components/ContentPost';
import ContentInfo from './components/ContentInfo/ContentInfo';

  const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={<Layout><Home /></Layout>}
          />
          <Route
            path="/write"
            element={<Layout><ContentPost /></Layout>}
          />
          <Route
            path="/content/:id"
            element={<Layout><ContentInfo /></Layout>}
          />
        </Routes>
      </Router>
    );
  };
export default App;
