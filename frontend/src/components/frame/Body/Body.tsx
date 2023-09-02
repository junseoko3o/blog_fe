import React from 'react';
import styles from './lib/body.module.css';

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.body}>{children}</div>;
}

export default Body
