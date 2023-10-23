import api from 'api/api';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from 'hooks/store/store';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socketApi = process.env.REACT_APP_SERVER_API || '';
const socket = io(socketApi);

const useLogout = () => {
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    socket.on('logOut', (data) => {
      if (data) {
        return data;
      }
    });
  }, []);
  
  const handleLogout = async () => {
    await api.post('/auth/logout')
    .then(response => {
      socket.emit('logout', user);
      message.success('로그아웃 완료');
      navigate('/');
    })
    .catch(error => {
      message.error('로그아웃 실패');
    });
   }
  return { handleLogout };
}

export default useLogout;