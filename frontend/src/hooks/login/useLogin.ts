import { useState, useEffect } from 'react';
import api from '../../api/api';

export interface UserProfile {
  id: number;
  email: string;
  user_name: string;
  access_token?: string;
  refresh_token?: string;
}

export const useLogin = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    const checkAccessToken = async () => {
      if (!accessToken) {
        return;
      }

      try {
        const response = await api.get('/user/authenticate', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Access token invalid, trying to refresh');
          refreshAccessToken();
        }
      } catch (error) {
        console.error('Error checking access token:', error);
      }
    };

    const refreshAccessToken = async () => {
      if (!refreshToken) {
        return;
      }

      try {
        const response = await api.get('/user/refresh', {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (response.status === 200) {
          const data: UserProfile = response.data;
          setAccessToken(data.access_token || '');
          setUser(data);
        } else {
          console.error('Refresh token invalid');
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    };

    checkAccessToken();
  }, [accessToken, refreshToken]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { email, password: password });

      if (response.status === 201) {
        const data: UserProfile = response.data;
        setAccessToken(data.access_token || '');
        setRefreshToken(data.refresh_token || '');
        setUser(data);
        return data;
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return { user, accessToken, handleLogin };
};
