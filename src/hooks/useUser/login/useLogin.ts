import api from 'api/api';
import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { loginCheck, userState } from 'hooks/store/store';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { LoginUser } from './lib/interface';

const socketApi = process.env.REACT_APP_SERVER_API || '';
const socket = io(socketApi);

const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const [logined, setLogined] = useRecoilState(loginCheck);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

  const login = async () => {
    const loginUser: LoginUser = {
      user_email: email,
      password,
    };

    try {
      const res = await api.post('/auth/login', loginUser);
      const data = res.data;

      setEmail('');
      setPassword('');
      setUser(data);

      navigate('/home');
    } catch (error: any) {
      if (error.response?.status === 400) {
        message.error('비번틀림');
      } else if (error.response?.status === 404) {
        message.error('이메일 틀림');
      } else {
        message.error('로그인 실패');
      }
    }
  }


  const handledLogin = async () => {
    socket.emit('login', user);
    await login();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handledLogin();
    }
  };

  const signUp = () => {
    navigate('/signup');
  }
  return { email, setEmail, password, setPassword, login, signUp, handledLogin, handleKeyPress };
}

export default useLogin;
