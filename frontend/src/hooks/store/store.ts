import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    id: null,
    user_email: null,
    user_name: null,
    access_token: null,
    refresh_token: null,
  }
});

export const contentState = atom({
  key: 'contentState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})