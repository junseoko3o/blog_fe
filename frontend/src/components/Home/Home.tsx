import React from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../Content/Content';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Content></Content>
    </div>
  );
};

export default Home;
