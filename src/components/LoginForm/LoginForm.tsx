import React, { useState } from 'react';
import logo from './lib/kuromi.svg'
import styles from './lib/login.module.css';
import useLogin from 'hooks/useUser/login/useLogin';
import { Button } from 'antd';


const LoginForm = () => {
  const { email, setEmail, password, setPassword, handledLogin, signUp } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles.container}>
          <img src={logo} alt="" className={styles.image} />
          <h2 className={styles.title}>Login</h2>
          <form className={styles.loginForm} name="login" onSubmit={handledLogin}>
            <div className={styles.email}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.password}>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                {showPassword ? '👁️' : '🚫'}
              </span>
            </div>

            <div className={styles.buttonContainer}>
              <Button type="primary" onClick={handledLogin} className={styles.loginButton}>
                Login
              </Button>
              <Button type="primary" onClick={signUp} className={styles.signUpButton}>
                SignUp
              </Button>
            </div>
          </form>
      </div>
    </>
  );
};

export default LoginForm;
