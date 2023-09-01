import React from 'react';
import style from './lib/layout.module.css';
import useNav from 'hooks/nav/useNav';
import Header from 'components/frame/Header/Header';
import Aside from 'components/frame/Aside/Aside';
import Body from 'components/frame/Body/Body';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const asideNavList = useNav();

  return (
    <div className={style.container}>
      <Header />
      <div className={style.asideContainer}>
        <div className={style.aside}>
          <Aside data={asideNavList} />
        </div>
      </div>
      <div className={style.bodyContainer}>
        <Body>{children}</Body>
      </div>
    </div>
  );
}

export default Layout
  