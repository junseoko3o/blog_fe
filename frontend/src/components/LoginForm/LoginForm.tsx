import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/login/useLogin';
import style from './lib/login.module.css';
import logo from 'logo.svg';

const LoginForm = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      console.error('로그인에 실패했습니다.');
    }
  };

  return (
    <div className={style.loginContainer}>
      <img className={style.loginLogo} src={logo} alt="" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.input}
          />
        </div>
        <button type="submit" className={style.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
