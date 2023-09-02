import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from 'hooks/login/useLogin';
import styles from './lib/login.module.css';
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
    <div className={styles.loginContainer}>
      <img className={styles.loginLogo} src={logo} alt="" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
