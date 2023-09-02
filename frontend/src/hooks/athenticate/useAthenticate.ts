import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useRecoilState } from 'recoil';
import { authenticatedUserState } from '../store/store';
import { useNavigate } from 'react-router';
import { message } from 'antd';

export const useUserAuthenticate = () => {
  const [user, setUser] = useRecoilState(authenticatedUserState);
  const [buttonReady, setButtonReady] = useState(false);
  const navigate = useNavigate();

  const authenticateUser = async () => {
    await api.get('/user/authenticate')
    .then(response => {
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      }
    })
    .catch(error => {
      message.error('토큰이 만료되었습니다.');
      navigate('/');
    })
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
