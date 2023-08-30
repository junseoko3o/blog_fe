import { MenuData } from "../../components/frame/Menu/lib/interface";

const useNav = (): MenuData[] => {
  return [
    {
      title: '처음으로',
      link: '/home',
    },
    {
      title: '나의 컨텐츠',
      link: '/info',
    },
    {
      title: '작성하기',
      link: '/write',
    }
  ];
};

export default useNav;
