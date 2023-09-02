import api from '../../api/api';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from '../store/store';
import { useParams, useNavigate } from 'react-router';
import { message } from 'antd';

export const useContentDelete = () => {
  const { id } = useParams();
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
       await api.delete(`/content/${id}`)
       .then(response => {
          message.success('삭제가 완료되었습니다.');
          navigate('/home');
       })
       .catch(err => {
        message.error('삭제를 실패하였습니다.');
       })
    }
  };

  return { id, user, handleDelete };
}
