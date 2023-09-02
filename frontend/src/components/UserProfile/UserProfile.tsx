import style from './lib/userProfile.module.css';
import useUserDetailInfo from "hooks/userDetailInfo/useUserDetailInfo";

const UserProfile = () => {
  const { userInfo }  = useUserDetailInfo();
  
  return (
    <div className={style.userProfileContainer}>
        <ul>
          <li key={userInfo?.id}>
            <h2 className={style.userProfileItem}>{userInfo?.user_email}</h2>
            <p className={style.userProfileItem}>{userInfo?.user_name}</p>
          </li>
        </ul>
    </div>
  );
}
export default UserProfile