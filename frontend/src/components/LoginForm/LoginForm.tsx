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
      <form onSubmit={handleSubmit} className={style.LoginForm}>
        <div>
          <label>Email</label>
          <input
            className={style.loginForm}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={style.loginForm}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={style.loginForm} type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
