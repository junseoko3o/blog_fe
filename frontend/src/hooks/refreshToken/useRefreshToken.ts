import { useState, useEffect } from 'react';
import api from 'api/api';
import { NewAccessToken } from './interface';

export const useRefreshToken = () => {
  const [newAccessToken, setNewAccessToken] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await api.get('/user/refresh');

        if (response.status === 200) {
          setNewAccessToken(response.data.access_token);
        }
      } catch (error) {
        alert('토큰 재발급 실패');
      }
    };

    refreshAccessToken();
  }, []);

  return newAccessToken;
}

export default useRefreshToken;
