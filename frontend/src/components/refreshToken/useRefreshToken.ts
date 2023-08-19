// useTokenRefresh.js

import { useState, useEffect } from 'react';
import api from '../../api/api';

function useTokenRefresh(refresh_token: string) {
  const [newAccessToken, setNewAccessToken] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await api.get('/user/refresh', {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });

        if (response.status === 200) {
          setNewAccessToken(response.data.access_token);
        }
      } catch (error) {
        alert('토큰 재발급 실패');
      }
    };

    if (refresh_token) {
      refreshAccessToken();
    }
  }, [refresh_token]);

  return newAccessToken;
}

export default useTokenRefresh;
