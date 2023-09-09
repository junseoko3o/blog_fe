import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { message } from 'antd';
import { useNavigate } from "react-router";
import { UpdateUserProfile } from "./lib/interface";

const useProfileUpdate = () => {
  const user = useRecoilValue(authenticatedUserState);
  // const [userName, setUserName ] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(''); 
  const [ password, setPassword ] = useState<string>("");
  const navigate = useNavigate();

  const handledUserUpdate = async () => {
    const UserProfile: UpdateUserProfile = {
      password,
    }
    await api.post(`/user/update/${user.id}`, UserProfile)
      .then(res => {
        // setUserName("");
        setPassword("");
        message.success('변경 완료');
        navigate('/profile');
        return res.data;
      })
      .catch(err => {
        message.error('뭔가 문제가 있으야..');
      })
  }

  const validatePassword = (rule: any, value: string, callback: (error?: string) => void) => {
    if (value && value !== password) {
      callback('비밀번호가 일치하지 않습니다.');
    } else {
      callback();
    }
  };

  const cancelUpdate = () => {
    navigate('/profile');
  }
  return { password, setPassword, confirmPassword, setConfirmPassword, handledUserUpdate, cancelUpdate, validatePassword };
}

export default useProfileUpdate;