import api from 'api/api';
import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { loginCheck, userState } from 'hooks/store/store';
import io from 'socket.io-client';
import { useEffect } from 'react';

const socketApi = process.env.REACT_APP_SERVER_API || '';
const socket = io(socketApi);

const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const [logined, setLogined] = useRecoilState(loginCheck);
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    socket.on('loggedIn', (data) => {
      if (data) {
        setLogined(data);
        return logined;
      }
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await api.post('/auth/login', { user_email: email, password })
        .then((res) => {
          const data = res.data;
          setUser(data);
          navigate('/home');
          return user;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            message.error('비번틀림');
          }
          if (error.response.status === 404) {
            message.error('이메일 틀림');
          };
        });
      } catch (err) {
        message.error('로그인 실패');
      }
  }

  const handledLogin = async (values: { email: string, password: string }) => {
    const { email, password } = values;
    socket.emit('login', user);
    await login(email, password);
  };

  const signUp = () => {
    navigate('/signup');
  }
  return { login, signUp, handledLogin };
}

export default useLogin
