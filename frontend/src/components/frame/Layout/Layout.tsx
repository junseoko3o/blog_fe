import React from 'react';
import Styles from './lib/layout.module.css';
import useNav from '../../../hooks/nav/useNav';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Body from '../Body/Body';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const asideNavList = useNav();

  return (
    <div className={Styles.container}>
      <Header />
      <div className={Styles.asideContainer}>
        <div className={Styles.aside}>
          <Aside data={asideNavList} />
        </div>
      </div>
      <div className={Styles.bodyContainer}>
        <Body>{children}</Body>
      </div>
    </div>
  );
}

export default Layout
  