import { useRecoilState } from 'recoil';
import { userState } from '../store/store';
import api from '../../api/api';

export const useLogin = () => {
  const [user, setUser] = useRecoilState(userState);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { user_email: email, password });

      if (response.status === 201) {
        const data = response.data;
        setUser(data);
        console.log(data);
        return data;
      }
    } catch (error) {
      console.error('로그인에 실패했습니다.', error);
    }

    return null;
  }

  return { login };
}

export default useLogin;
