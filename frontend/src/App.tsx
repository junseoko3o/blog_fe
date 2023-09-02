import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/frame/Layout';
import LoginForm from './components/LoginForm';
import ContentPost from './components/ContentPost';
import useUserAuthenticate from './hooks/athenticate/useAthenticate';
import UserProfile from 'components/UserProfile/UserProfile';
import ContentInfo from 'components/ContentInfo/ContentInfo';
import ContentUpdate from 'components/ContentUpdate/ContentUpdate';

const App = () => {
  const { authenticateUser } = useUserAuthenticate();

  useEffect(() => {
    authenticateUser();
  }, []);

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
          path="/profile"
          element={<Layout><UserProfile /></Layout>}
        />
        <Route
          path="/content/:id"
          element={<Layout><ContentInfo /></Layout>}
        />
         <Route
          path="/content/edit/:id"
          element={<Layout><ContentUpdate /></Layout>}
        />
      </Routes>
    </Router>
  );
};
export default App;

