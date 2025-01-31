import styled from 'styled-components';

export const StudentInputBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* transform: translate(-50%, -50%); */
  overflow: hidden;
  height: 80px;
  width: 200px;
  background-color: wheat;
  z-index: 15;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;
