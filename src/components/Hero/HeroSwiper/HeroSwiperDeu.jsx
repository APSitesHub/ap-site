import useSize from '@react-hook/size';
import { DesktopSwiperDeu } from './VersionSwipers/DesktopSwiperDeu';
import { MobileSwiperDeu } from './VersionSwipers/MobileSwiperDeu';

export const HeroSwiperDeu = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return <>{width < 768 ? <MobileSwiperDeu /> : <DesktopSwiperDeu />}</>;
};
