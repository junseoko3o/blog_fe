import { authenticatedUserState } from "hooks/store/store";
import { useRecoilValue } from "recoil";
import { PasswordCheck } from "./lib/interface";
import { useState } from "react";
import { message } from "antd";
import api from "api/api";

const usePasswordCheck = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [ currentPassword, setCurrentPassword, ] = useState<string>("");
  const [ isInputEnabled, setInputEnabled ] = useState<boolean>(false);

  const checkPassword = async (password: string) => {
    const check: PasswordCheck = {
      user_email: user.user_email,
      password,
    }
   const response = await api.post<PasswordCheck>('/user/validate', check);
    try {
      if (response.data) {
        setCurrentPassword("");
        setInputEnabled(true);
        message.success('니꺼 맞았네');
        return response.data;
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
         message.error('누구냐');
      }
    }
  }

  return { user, currentPassword, setCurrentPassword, isInputEnabled, setInputEnabled, checkPassword };
}

export default usePasswordCheck;