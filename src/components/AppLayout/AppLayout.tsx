import React from "react";
import { Layout } from "antd";
import kuromi from './lib/kuromi.png';
import styles from './lib/appLayout.module.css';
import AppMenu from "components/AppMenu/AppMenu";

const { Content, Header } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {  
  return (
    <>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.headerContent}>
            <img src={kuromi} className={styles.image} alt="kuromi"></img>
            <span className={styles.userName}>Lee Jae Gyeong</span>
            <div className={styles.menuList}>
              <AppMenu />
            </div>
          </div>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default AppLayout;
