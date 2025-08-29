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
          src="https://wheelofnames.com/uk/uek-zq4"
          width="100%"
          height="100%"
           style={{
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
    width: '125%',
    height: '125%',
    border: 'none',
  }}
        ></iframe>
      </PlatformBoxVertical>
    </>
  );
};
