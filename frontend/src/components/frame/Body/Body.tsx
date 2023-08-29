import React from 'react';
import Styles from './lib/body.module.css';

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className={Styles.body}>{children}</div>;
}

export default Body
