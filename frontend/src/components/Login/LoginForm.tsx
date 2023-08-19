import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/login/useLogin';
import { useRecoilValue } from 'recoil';
import { userState } from '../../hooks/store/store';

const LoginForm = () => {
  useRecoilValue(userState);
  const { login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = await login(email, password);
    
    if (userData) {
      navigate('/home', { state: { user: userData } });
    } else {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 변경 처리
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
