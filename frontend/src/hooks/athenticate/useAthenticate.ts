import { useState, useEffect } from 'react';
import api from '../../api/api';

export const useAuthenticate= (access_token: string) => {
  const [user, setUser] = useState();

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
        console.error('인증 실패', error);
      }
    };
      authenticateUser();
  }, [access_token]);

  return user;
}

export default useAuthenticate;
