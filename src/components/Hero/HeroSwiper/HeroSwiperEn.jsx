import useSize from '@react-hook/size';
import { DesktopSwiperEn } from './VersionSwipers/DesktopSwiperEn';
import { MobileSwiperEn } from './VersionSwipers/MobileSwiperEn';

export const HeroSwiperEn = ({toggleModal}) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return <>{width < 768 ? <MobileSwiperEn toggleModal={toggleModal}/> : <DesktopSwiperEn toggleModal={toggleModal}/>}</>;
};
