import { MenuData } from "../../components/frame/Menu/lib/interface";

const useNav = (): MenuData[] => {
  return [
    {
      title: 'Home',
      link: '/home',
    },
    {
      title: 'Profile',
      link: '/profile',
    },
    {
      title: 'Post',
      link: '/write',
    }
  ];
};

export default useNav;
