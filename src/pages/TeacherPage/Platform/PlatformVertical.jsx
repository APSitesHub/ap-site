import { PlatformBoxVertical } from './Platform.styled';

export const PlatformVertical = ({ isPlatformOpen, isOpenedLast }) => {
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'platform' ? '4' : '1',
    };
  };

  return (
    <>
      <PlatformBoxVertical
        className={isPlatformOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <iframe
          className={'active'}
          id="platform-window"
          title="platform-pin"
          src="https://online.ap.education/school/"
          width="100%"
          height="100%"
        ></iframe>
      </PlatformBoxVertical>
    </>
  );
};
