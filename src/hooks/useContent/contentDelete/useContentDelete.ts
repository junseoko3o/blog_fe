import api from '../../../api/api';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from '../../store/store';
import { useNavigate } from 'react-router';
import { message } from 'antd';

const useContentDelete = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
       await api.delete(`/content/${contentId}`)
       .then(response => {
          message.success('삭제가 완료되었습니다.');
          navigate('/home');
       })
       .catch(err => {
        message.error('삭제를 실패하였습니다.');
       })
    }
  };

  return { user, handleDelete };
}

export default useContentDelete;
