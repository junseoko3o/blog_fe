import React from 'react';
import logo from './lib/kuromi.svg'
import styles from './lib/login.module.css';
import useLogin from 'hooks/useUser/login/useLogin';


const LoginForm = () => {
  const { email, setEmail, password, setPassword, handledLogin, signUp } = useLogin();

  return (
    <>
      <div className={styles.container}>
        <div>
          <img src={logo} alt="" className={styles.image} />
          <h2 className={styles.title}>Login</h2>
          <form name="login" onSubmit={handledLogin}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.loginButton}>
                Login
              </button>
              <button type="button" onClick={signUp} className={styles.signUpButton}>
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
