import { useRecoilValue } from "recoil"
import { authenticatedUserState } from "../store/store"
import { contentPost } from "./interface";
import api from "../../api/api";

export const useContentPost = () => { 
  const user = useRecoilValue(authenticatedUserState);

  const createContentPost = async (contentPost: contentPost) => {
    try {
      const response = await api.post('/content', contentPost);
      return response.data;
   } catch (err) {
    console.log(err);
   }
  }
  return { user, createContentPost }
}