import useSize from '@react-hook/size';
import { DesktopSwiperNew } from './VersionSwipers/DesktopSwiperNew';
import { MobileSwiperNew } from './VersionSwipers/MobileSwiperNew';

export const HeroSwiperNew = ({toggleModal}) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return <>{width < 768 ? <MobileSwiperNew toggleModal={toggleModal}/> : <DesktopSwiperNew toggleModal={toggleModal}/>}</>;
};
