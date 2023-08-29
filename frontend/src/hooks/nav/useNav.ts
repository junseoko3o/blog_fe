import { MenuData } from "../../components/frame/Menu/lib/interface";

const useNav = (): MenuData[] => {
  return [
    {
      title: '처음으로',
      link: '/home',
    },
    {
      title: '작성하기',
      link: '/write',
    }
  ];
};

export default useNav;
