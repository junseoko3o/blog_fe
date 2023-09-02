import React from 'react';
import { Typography, List, Spin } from 'antd';
import useUserDetailInfo from 'hooks/userDetailInfo/useUserDetailInfo';
import styles from './lib/userProfile.module.css';

const { Text } = Typography;

const UserProfile = () => {
  const { userInfo } = useUserDetailInfo();

  return (
    <div>
        <Spin />
        <List
          size="large"
          header={<h2 className={styles.title}>Profile</h2>}
          dataSource={[
            { title: 'Email', value: userInfo?.user_email },
            { title: 'Name', value: userInfo?.user_name },
          ]}
          renderItem={(item) => (
            <List.Item>
              <Text strong>{item.title}:</Text> {item.value}
            </List.Item>
          )}
        />
    </div>
  );
};

export default UserProfile;
