import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from './lib/appLayout.module.css';

const { Sider, Content, Header } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  
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
    }
  ];
  return (
    <Layout className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleMenu}>
        <div className="logo" />
        <Menu
          theme="dark"
          items={data.map((e, i) => ({
            key: i, 
            icon: e.icon,
            label: <Link to={e.link}>{e.title}</Link>
          }))}
          mode="inline"
        >
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          Lee Jae Gyeong
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
