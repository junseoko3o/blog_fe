import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styles from './lib/menu.module.css';

const AppMenu = () => {
  const data = [
    {
      title: 'Home',
      link: '/home',
      icon: <HomeOutlined />,
    },
    {
      title: 'Profile',
      link: '/profile',
      icon: <UserOutlined />,
    },
    {
      title: 'Post',
      link: '/write',
      icon: <EditOutlined />,
    },
  ];
  
  return (
    <>
      <Menu
        theme="dark"
        items={data.map((e, i) => ({
          key: i, 
          icon: e.icon,
          label: <Link to={e.link}>{e.title}</Link>
        }))}
        mode="inline"
        className={styles.menu}
      >
      </Menu>
    </>
  )
}

export default AppMenu;