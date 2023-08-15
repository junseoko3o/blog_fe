import React, { useState } from 'react';
import { useLogin } from '../../hooks/login/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { handleLogin } = useLogin();
  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await handleLogin(email, password);
    navigate('/home', { state: { user } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
