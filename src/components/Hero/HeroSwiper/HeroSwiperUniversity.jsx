import useSize from '@react-hook/size';
import { DesktopSwiperUniversity } from './VersionSwipers/DesktopSwiperUniversity';
import { MobileSwiperUniversity } from './VersionSwipers/MobileSwiperUniversity';

export const HeroSwiperUniversity = ({ toggleModal }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return (
    <>
      {width < 768 ? (
        <MobileSwiperUniversity toggleModal={toggleModal} />
      ) : (
        <DesktopSwiperUniversity toggleModal={toggleModal} />
      )}
    </>
  );
};
