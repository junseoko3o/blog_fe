import api from '../../../api/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authenticatedUserState } from '../../store/store';
import { useLocation, useNavigate } from 'react-router';
import { message } from 'antd';
import { UserAuthentication } from './lib/interface';

const useUserAuthenticate = () => {
  const [user, setUser] = useRecoilState(authenticatedUserState);
  const navigate = useNavigate();
  const location = useLocation();


  const authenticateUser = async () => {
    try {
      const response = await api.get<UserAuthentication>('/auth/authenticate');
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
        try {
          const retryResponse = await api.get<UserAuthentication>('/auth/authenticate');
          if (retryResponse.status === 200) {
            setUser(retryResponse.data);
            return;
          }
        } catch (e) {}
      message.error('토큰이 만료되었습니다.');
      navigate('/');
    }
  };


  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/signup') {
      authenticateUser();
    }
  }, [location.pathname]);

  return { authenticateUser, user, location };
};

export default useUserAuthenticate;
