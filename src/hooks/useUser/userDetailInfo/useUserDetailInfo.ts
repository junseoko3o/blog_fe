import api from 'api/api';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from 'hooks/store/store';
import { UserProfile } from './lib/interface';
import { message } from 'antd';
import { useNavigate } from 'react-router';

const useUserDetailInfo = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const navigate = useNavigate();

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

  const profileUpdateButton = () => {
    navigate('/profile/update');
  }
 
  return { userInfo, useUserDetailInfo, profileUpdateButton };
}

export default useUserDetailInfo;
