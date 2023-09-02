import React from 'react';
import styles from './lib/menu.module.css';
import { MenuProps } from './lib/interface';

const Menu = ({ data }: MenuProps) => {
  return (
    <ul className={styles.menuList}>
      {data.map((e) => (
        <li key={e.link} className={styles.menuItem}>
          <a href={e.link} className={styles.menuLink}>
            {e.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
