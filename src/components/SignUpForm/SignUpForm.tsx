import React from 'react';
import styles from './lib/signUp.module.css'
import melody from './lib/melody.png';
import useSignUp from 'hooks/useUser/signUp';

const SignUpForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    passwordError,
    setPasswordError,
    signUp,
    confirmPassword,
    setConfirmPassword,
    validatePassword,
    backLogin,
  } = useSignUp();

  
  return (
    <div className={styles.container}>
      <img src={melody} alt="" className={styles.image} />
      <h1 className="title">SignUp</h1>
      <form className="layout" onSubmit={signUp}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          onBlur={(e) => validatePassword(null, e.target.value, setPasswordError)}
        />
          {passwordError && <p className={styles.error}>{passwordError}</p>}  
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.signUpButton}>SignUp</button>
          <button type="button" className={styles.backButton} onClick={backLogin}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
