import { useEffect } from 'react';
import api from '../../api/api';
import { useRecoilState } from 'recoil';
import { userState } from '../store/store';

export const useUserAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState);

  const authenticateUser = async () => {
    try {
      const response = await api.get('/user/authenticate');
      
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      }
    } catch (error) {
      console.error('유저 인증에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    authenticateUser();

    const intervalId = setInterval(authenticateUser, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return { authenticateUser };
};

export default useUserAuthenticate;
