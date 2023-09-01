import React from 'react';
import style from './lib/body.module.css';

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.body}>{children}</div>;
}

export default Body
