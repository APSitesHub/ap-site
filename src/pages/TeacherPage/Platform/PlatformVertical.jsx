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
          width="58.82%"
          height="58.82%"
        ></iframe>
      </PlatformBoxVertical>
    </>
  );
};
