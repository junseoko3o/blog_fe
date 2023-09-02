import React from 'react';
import { MenuData } from 'components/frame/Menu/lib/interface';
import Menu from 'components/frame/Menu/Menu';
import styles from './lib/aside.module.css';

const Aside = ({ data }: { data: MenuData[] }) => {
  return (
    <aside className={styles.asideContainer}>
      <Menu data={data} />
    </aside>
  );
};

export default Aside;
