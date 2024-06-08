import useSize from '@react-hook/size';
import { DesktopSwiperDe } from './VersionSwipers/DesktopSwiperDe';
import { MobileSwiperDe } from './VersionSwipers/MobileSwiperDe';

export const HeroSwiperDe = ({ toggleModal }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  return (
    <>
      {width < 768 ? (
        <MobileSwiperDe toggleModal={toggleModal} />
      ) : (
        <DesktopSwiperDe toggleModal={toggleModal} />
      )}
    </>
  );
};
