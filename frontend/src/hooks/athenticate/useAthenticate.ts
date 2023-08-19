// useAuthenticate.js

import { useState, useEffect } from 'react';
import api from '../../api/api';

function useAuthenticate(access_token: string) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await api.get('/user/authenticate', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        alert('인증 실패');
      }
    };

    if (access_token) {
      authenticateUser();
    }
  }, [access_token]);

  return user;
}

export default useAuthenticate;
