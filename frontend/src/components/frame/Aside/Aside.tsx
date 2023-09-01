import React from 'react';
import { MenuData } from 'components/frame/Menu/lib/interface';
import Menu from 'components/frame/Menu/Menu';

const Aside = ({ data }: { data: MenuData[] }) => {
  return (
    <aside>
      <Menu data={data} />
    </aside>
  );
}

export default Aside
