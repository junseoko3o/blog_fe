import api from 'api/api';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useLocation } from 'react-router';

export const useRefreshToken = () => {
  const [newAccessToken, setNewAccessToken] = useState('');
  const location = useLocation();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (location.pathname !== '/' || '/signup') {
      await api.get('/user/refresh')
        .then(response => {
          if (response.status === 200) {
            setNewAccessToken(response.data.access_token);
          }
        })
        .catch(err => {
          message.error('리프레시도 없음');
        })
      };
    }
      const intervalId = setInterval(refreshAccessToken, 540000);
    return () => clearInterval(intervalId);
  }, []);

  return { newAccessToken };
}

export default useRefreshToken;
