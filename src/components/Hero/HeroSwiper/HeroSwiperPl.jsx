import useSize from '@react-hook/size';
import { DesktopSwiperPl } from './VersionSwipers/DesktopSwiperPl';
import { MobileSwiperPl } from './VersionSwipers/MobileSwiperPl';

export const HeroSwiperPl = ({ toggleModal }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return (
    <>
      {width < 768 ? (
        <MobileSwiperPl toggleModal={toggleModal} />
      ) : (
        <DesktopSwiperPl toggleModal={toggleModal} />
      )}
    </>
  );
};
