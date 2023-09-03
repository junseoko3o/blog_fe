import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import kuromi from './lib/kuromi.png';
import styles from './lib/appLayout.module.css';
import useLogout from "hooks/logout/useLogout";

const { Sider, Content, Header } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogout } = useLogout();
  
  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

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
    <Layout className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleMenu} className={styles.sider}>
        <div>
          <img src={kuromi} className={styles.image}></img>
        </div>
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
      </Sider>
      <Layout>
        <Header className={styles.header}>
          Lee Jae Gyeong
          <button onClick={handleLogout} className={styles.logoutButton}></button>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
