import api from '../../api/api';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from '../store/store';
import { useParams, useNavigate } from 'react-router';

export const useContentDelete = () => {
  const { id } = useParams();
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();
  console.log(user)
  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await api.delete(`/content/${id}`);
        if (response) {
          navigate('/home');
        } else {
          console.error('Error deleting content.');
        }
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  return { id, user, handleDelete };
}
