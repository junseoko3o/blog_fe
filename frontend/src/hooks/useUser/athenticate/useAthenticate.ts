import api from '../../../api/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authenticatedUserState } from '../../store/store';
import { useLocation, useNavigate } from 'react-router';
import { message } from 'antd';

export const useUserAuthenticate = () => {
  const [user, setUser] = useRecoilState(authenticatedUserState);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname !== '/' || '/signup') {
      authenticateUser();
    }
  }, [location.pathname]);

  return { authenticateUser, user, location };
};

export default useUserAuthenticate;
