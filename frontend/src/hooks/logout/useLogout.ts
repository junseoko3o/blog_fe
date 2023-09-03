import api from '../../api/api';
import { message } from 'antd';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const navigate = useNavigate();
    const handleLogout = async () => {
      await api.get('/user/logout')
      .then(response => {
        message.success('로그아웃 완료');
        navigate('/')
      })
      // .catch(error => {
      //   console.log(error);
      //   message.error('로그아웃 실패');
      // });
   }
  return { handleLogout };
}

export default useLogout;