import api from "api/api";
import { useState } from "react";
import { message } from 'antd';
import { UserSignUp } from "./lib/interface";
import { useNavigate } from "react-router";

const useSignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); 
  const navigate = useNavigate();

  const handledSignUp = async () => {
    const signUp: UserSignUp = {
      user_email: email,
      password,
      user_name: name,
    };

    await api.post<UserSignUp>('/user/signup', signUp)
      .then(response => {
        setEmail("");
        setPassword("");
        setName("");
        navigate('/');
        response.data;
      })
      .catch(err => {
        if (err.response.status === 400) {
          message.error('이메일 이미 있음');
        }
      })
  }

  const validatePassword = (rule: any, value: string, callback: (error?: string) => void) => {
    if (value && value !== password) {
      callback('비밀번호가 일치하지 않습니다.');
    } else {
      callback();
    }
  };

  const backLogin = () => {
    navigate('/');
  }

  return { email, setEmail, password, setPassword, name, setName, handledSignUp, confirmPassword, setConfirmPassword, validatePassword, backLogin }
}

export default useSignUp;