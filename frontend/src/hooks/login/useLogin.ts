import { useRecoilState } from 'recoil';
import { userState } from '../store/store';
import { message } from 'antd';
import api from 'api/api';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    await api.post('/user/login', { user_email: email, password })
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
          message.error('이메일 틀림')
        };
      });
  
  }
  return { login };
}

export default useLogin
