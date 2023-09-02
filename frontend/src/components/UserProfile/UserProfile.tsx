import React from 'react';
import { Typography, List, Spin } from 'antd';
import useUserDetailInfo from 'hooks/userDetailInfo/useUserDetailInfo';
import styles from './lib/userProfile.module.css';
import kuromi from './lib/kuromi.png';

const { Text } = Typography;

const UserProfile = () => {
  const { userInfo } = useUserDetailInfo();

  return (
    <div>
        <div>
          <img src={kuromi} className={styles.image}></img>
        </div>
        <List
          size="large"
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
