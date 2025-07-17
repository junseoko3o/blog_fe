import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { loginCheck, userState } from 'hooks/store/store';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { LoginUser } from './lib/interface';
import api from 'api/api';

const socketApi = process.env.REACT_APP_SERVER_API || '';

const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const [logined, setLogined] = useRecoilState(loginCheck);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handledLogin = async () => {
    const loginUser: LoginUser = {
      user_email: email,
      password,
    };

    try {
      await api.post('/auth/login', loginUser)
        .then((res) => {
          const data = res.data;
          setEmail('');
          setPassword('');
          setUser(data);
          navigate('/home');

          const socket = io(socketApi);
          socket.connect();
          
          socket.emit('login', data);
          socket.on('loggedIn', (data) => {
            if (data) {
              setLogined(data);
            }
          });
          return () => {
            socket.disconnect();
          };
        })
        .catch((error) => {
          if (error.response.status === 400) {
            message.error('비밀번호 틀림');
          }
          if (error.response.status === 404) {
            message.error('이메일 틀림');
          }
        });
    } catch (err) {
      message.error('로그인 실패');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handledLogin();
    }
  };

  const signUp = () => {
    navigate('/signup');
  };

  return { email, setEmail, password, setPassword, handledLogin, handleKeyPress, signUp };
}

export default useLogin;
