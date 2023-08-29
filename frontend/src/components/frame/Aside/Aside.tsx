import React from 'react';
import { MenuData } from '../Menu/lib/interface';
import Menu from '../Menu';

const Aside = ({ data }: { data: MenuData[] }) => {
  return (
    <aside>
      <Menu data={data} />
    </aside>
  );
}

export default Aside
