import React from 'react';
import Profile from '../Profile/Profile';
import { useLocation } from 'react-router-dom';

interface UserProfile {
  id: number;
  email: string;
  user_name: string;
  access_token?: string;
}

const Home = () => {
  const location = useLocation();
  const user: UserProfile = location.state?.user;
  return (
    <div>
      <h2>Home</h2>
      <Profile user={user} />
    </div>
  );
};

export default Home;
