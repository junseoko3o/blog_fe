import React from 'react';
import styles from './lib/layout.module.css';
import useNav from 'hooks/nav/useNav';
import Header from 'components/frame/Header/Header';
import Aside from 'components/frame/Aside/Aside';
import Body from 'components/frame/Body/Body';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const asideNavList = useNav();

  return (
    <div>
      <Header />
      <div className={styles.asideContainer}>
        <div className={styles.aside}>
          <Aside data={asideNavList} />
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <Body>{children}</Body>
      </div>
    </div>
  );
}

export default Layout
  