import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useRecoilState } from 'recoil';
import { authenticatedUserState } from '../store/store';

export const useUserAuthenticate = () => {
  const [user, setUser] = useRecoilState(authenticatedUserState);
  const [buttonReady, setButtonReady] = useState(false);

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

  const handleUserAction = () => {
    authenticateUser();
  };

  useEffect(() => {
    const button = document.getElementById('myButton');

    if (button) {
      setButtonReady(true);
      button.addEventListener('click', handleUserAction);

      return () => {
        button.removeEventListener('click', handleUserAction);
      };
    }
  }, []);

  return { authenticateUser, user, buttonReady };
};

export default useUserAuthenticate;
