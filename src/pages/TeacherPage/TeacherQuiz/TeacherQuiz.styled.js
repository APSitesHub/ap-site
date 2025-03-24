import styled from 'styled-components';

export const TeacherInputBox = styled.div`
  position: absolute;
  bottom: 110px;
  right: 70px;
  transform: translate(-55px, -70px);
  z-index: 8;
  width: 36%;
  /* overflow: hidden; */
  border-top-left-radius: 5px;

  background-color: white;
  border-radius: 50px;
  overflow: hidden;

  font-family: var(--streams-font-family);

  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;

export const TeacherChatPageContainer = styled.div`
  position: relative;
  font-family: var(--my-ap-font-family);

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-size: auto 40%;
  background-position: top 30px right -44px;
  background-repeat: no-repeat;
  background-color: transparent;
`;

export const TeacherQuizConfirmation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 80%;
  z-index: 15;

  padding: 30px;

  background-color: white;
  border-radius: 50px;
  overflow: hidden;

  font-family: var(--streams-font-family);

  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;