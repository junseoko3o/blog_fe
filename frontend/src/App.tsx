import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/frame/Layout';
import LoginForm from './components/LoginForm';
import ContentPost from './components/ContentPost';
import ContentInfo from './components/ContentInfo/ContentInfo';
import { useRecoilValue } from 'recoil';
import { userState } from './hooks/store/store';

  const App = () => {
    const user = useRecoilValue(userState);
    console.log(user);
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={user ? <Layout><Home /></Layout> : <Navigate to="/home" />}
          />
          <Route
            path="/write"
            element={<Layout><ContentPost /></Layout>}
          />
          <Route
            path="/info"
            element={<Layout><ContentInfo /></Layout>}
          />
        </Routes>
      </Router>
    );
  };
export default App;
