import React from 'react';
import Style from './lib/menu.module.css';
import { MenuProps } from './lib/interface';


const Menu = ({ data }: MenuProps) => {
  return (
    <ul className={Style.menuList}>
      {data.map((e) => (
        <li key={e.link}>
          <a href={e.link}>{e.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default Menu