import React from 'react';
import styles from './lib/userProfile.module.css';
import useUserDetailInfo from "hooks/userDetailInfo/useUserDetailInfo";

const UserProfile = () => {
  const { userInfo } = useUserDetailInfo();

  return (
    <div className={styles.userProfileContainer}>
      <ul className={styles.userProfileList}>
        <li key={userInfo?.id} className={styles.userProfileItem}>
          <h2 className={styles.userProfileTitle}>User Email</h2>
          <p className={styles.userProfileValue}>{userInfo?.user_email}</p>
        </li>
        <li key={userInfo?.id} className={styles.userProfileItem}>
          <h2 className={styles.userProfileTitle}>User Name</h2>
          <p className={styles.userProfileValue}>{userInfo?.user_name}</p>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
