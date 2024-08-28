import { WhiteBoardBoxVertical } from './WhiteBoard.styled';

export const WhiteBoardVertical = ({
  page,
  isWhiteBoardOpen,
  isOpenedLast,
  sectionWidth,
}) => {
  const BOARDS = {
    record: 'http://go.limnu.com/chestnut-eatable',
  };

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'whiteboard' ? '3' : '1',
      width: sectionWidth,
    };
  };

  return (
    <>
      <WhiteBoardBoxVertical
        className={isWhiteBoardOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <iframe
          id="whiteboard window"
          title="whiteboard-pin"
          src={BOARDS[page]}
          width="100%"
          height="100%"
        ></iframe>
      </WhiteBoardBoxVertical>
    </>
  );
};
