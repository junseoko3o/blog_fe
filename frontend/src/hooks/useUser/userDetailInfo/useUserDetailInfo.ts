import api from 'api/api';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from 'hooks/store/store';
import { UserProfile } from './interface';
import { message } from 'antd';

export const useUserDetailInfo = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [userInfo, setUserInfo] = useState<UserProfile>({} as UserProfile);
  useEffect(() => {
    const getUserDetailInfo = async () => {
      await api.get(`/user/list/${user.id}`)
        .then(response => {
          const data = response.data;
          setUserInfo(data);
          return data;
        })
        .catch(err => {
          message.error('유저 정보 없음');
        });
      };

    getUserDetailInfo();
  }, [user.id]);

  return { userInfo, useUserDetailInfo };
}

export default useUserDetailInfo;
