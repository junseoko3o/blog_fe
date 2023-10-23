import React, { useState } from "react";
import { Layout, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import kuromi from './lib/kuromi.png';
import styles from './lib/appLayout.module.css';
import AppMenu from "components/AppMenu/AppMenu";
import useLogout from "hooks/useUser/logout/useLogout";
import { useRecoilValue } from "recoil";
import { loginCheck } from "hooks/store/store";

const { Sider, Content, Header } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const loginUser = useRecoilValue(loginCheck);
  const { handleLogout } = useLogout();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className={styles.layout}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleMenu} className={styles.sider}>
          <div>
            <img src={kuromi} className={styles.image}></img>
          </div>
          <AppMenu />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            Lee Jae Gyeong , 접속자 {loginUser.userList} 명
            <button onClick={handleLogout} className={styles.logoutButton}> <LogoutOutlined /></button>
          </Header>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
