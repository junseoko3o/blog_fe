import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/LoginForm';
import ContentPost from './components/ContentPost';
import useUserAuthenticate from './hooks/useUser/athenticate/useAthenticate';
import UserProfile from 'components/UserProfile/UserProfile';
import ContentInfo from 'components/ContentInfo/ContentInfo';
import ContentUpdate from 'components/ContentUpdate/ContentUpdate';
import AppLayout from 'components/AppLayout/AppLayout';
import GlobalConfigProvider from 'GlobalConfigProvider';
import useRefreshToken from 'hooks/useUser/refreshToken/useRefreshToken';

const App = () => {
  useUserAuthenticate();
  useRefreshToken();
  return (
    <GlobalConfigProvider>
      <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={<AppLayout><Home /></AppLayout>}
          />
          <Route
            path="/write"
            element={<AppLayout><ContentPost /></AppLayout>}
          />
          <Route
            path="/profile"
            element={<AppLayout><UserProfile /></AppLayout>}
          />
          <Route
            path="/content/:id"
            element={<AppLayout><ContentInfo /></AppLayout>}
          />
            <Route
            path="/content/edit/:id"
            element={<AppLayout><ContentUpdate /></AppLayout>}
          />
        </Routes>
    </GlobalConfigProvider>

  );
};
export default App;

