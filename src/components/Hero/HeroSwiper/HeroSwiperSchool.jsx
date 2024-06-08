import useSize from '@react-hook/size';
import { MobileSwiperSchool } from './VersionSwipers/MobileSwiperSchool';
import { DesktopSwiperSchool } from './VersionSwipers/DesktopSwiperSchool';

export const HeroSwiperSchool = ({ toggleModal }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return (
    <>
      {width < 768 ? (
        <MobileSwiperSchool toggleModal={toggleModal} />
      ) : (
        <DesktopSwiperSchool toggleModal={toggleModal} />
      )}
    </>
  );
};
