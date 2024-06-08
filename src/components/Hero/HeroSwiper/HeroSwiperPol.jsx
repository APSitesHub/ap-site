import useSize from '@react-hook/size';
import { DesktopSwiperPol } from './VersionSwipers/DesktopSwiperPol';
import { MobileSwiperPol } from './VersionSwipers/MobileSwiperPol';

export const HeroSwiperPol = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return <>{width < 768 ? <MobileSwiperPol /> : <DesktopSwiperPol />}</>;
};
