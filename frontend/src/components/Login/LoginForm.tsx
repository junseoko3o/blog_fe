import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/login/useLogin';
import { useRecoilValue } from 'recoil';
import { userState } from '../../hooks/store/store';
import Styles from './lib/login.module.css';
import logo from '../../logo.svg'; 

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
    <div className={Styles.loginContainer}>
      <img className={Styles.loginLogo} src={logo} alt="" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={Styles.LoginForm}>
        <div>
          <label>Email:</label>
          <input
            className={Styles.loginForm}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className={Styles.loginForm}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={Styles.loginForm} type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
