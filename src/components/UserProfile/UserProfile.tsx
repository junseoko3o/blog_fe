import React from 'react';
import { Typography, List, Button } from 'antd';
import useUserDetailInfo from 'hooks/useUser/userDetailInfo/useUserDetailInfo';
import styles from './lib/userProfile.module.css';
import kuromi from './lib/kuromi.png';
import { SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserProfile = () => {
  const { userInfo, profileUpdateButton } = useUserDetailInfo();

  return (
    <>
        <div>
          <img src={kuromi} className={styles.image}></img>
          <Button
            type="primary"
            size="large"
            icon={<SettingOutlined />}
            className={styles.settingButton}
            onClick={profileUpdateButton}
          />
        </div>
        <List
          size="large"
          dataSource={[
            { title: 'Email', value: userInfo.user_email },
            { title: 'Name', value: userInfo.user_name },
          ]}
          renderItem={(item) => (
            <List.Item>
              <Text strong>{item.title}:</Text> {item.value}
            </List.Item>
          )}
        />
    </>
  );
};

export default UserProfile;
