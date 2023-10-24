import { EditOutlined, HomeOutlined, LogoutOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styles from './lib/menu.module.css';
import useLogout from "hooks/useUser/logout";

const AppMenu = () => {
  const { handleLogout } = useLogout();

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
    {
      title: 'Chat',
      link: '/chat',
      icon: <MessageOutlined />
    },
  ];
  
  return (
    <>
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        {data.map((e, i) => (
          <Menu.Item key={i} icon={e.icon}>
            <Link to={e.link}>{e.title}</Link>
          </Menu.Item>
        ))}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
}

export default AppMenu;
