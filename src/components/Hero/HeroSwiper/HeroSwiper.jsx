import useSize from '@react-hook/size';
import { DesktopSwiper } from './VersionSwipers/DesktopSwiper';
import { MobileSwiper } from './VersionSwipers/MobileSwiper';

export const HeroSwiper = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return <>{width < 768 ? <MobileSwiper /> : <DesktopSwiper />}</>;
};
