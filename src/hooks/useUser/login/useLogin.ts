import api from 'api/api';
import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { userState } from 'hooks/store/store';

const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

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
    await login(email, password);
  };

  const signUp = () => {
    navigate('/signup');
  }
  return { login, signUp, handledLogin };
}

export default useLogin
