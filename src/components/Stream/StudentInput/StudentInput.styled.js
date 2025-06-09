import styled, { css } from 'styled-components';

export const StudentQuizBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70%;
  left: 50%;
  z-index: 15;

  height: 160px;
  width: 320px;
  border-radius: 25px;
  padding: 8px;

  transform: translate(-50%, -50%);
  overflow: hidden;

  background-color: #fff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }

  ${({ $isFeedback }) =>
    $isFeedback &&
    css`
      height: 320px;
      width: 480px;
      transform: none;
      top: auto;
      left: auto;
      bottom: 5%;
      right: 5%;

      @media (max-width: 768px) {
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`;

export const StudentQuizForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

export const StudentQuizBoxInput = styled.input`
  padding: 12px;
  height: 40px;
  width: 85%;

  border-radius: 50px;
  border: 2px solid #0f645b;
`;

export const StudentQuizSubmitBtn = styled.button`
  height: 40px;
  width: 85%;

  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.6px;

  border-radius: 50px;
  border: transparent;

  background: radial-gradient(70% 80% at -13.25% 26%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(70% 80% at 113.25% 74%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%), #000;
  transition: background-position 0.6s ease;
  background-size: 200% 200%;
  background-position: 0% 0%;

  &:hover {
    background-position: 100% 100%;
  }
`;

export const StudentQuizBoxInputNote = styled.p`
  color: red;
  font-size: 14px;
`;

export const StudentQuizSubmitBtnOptions = styled(StudentQuizSubmitBtn)`
  background: none;
  color: #000;
  border: 2px solid #0f645b;
`;

export const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

export const StarButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  & span {
    font-size: 2rem;
  }
`;

export const FeedbackTextaera = styled.textarea`
  border: 1px solid #0f645b;
  border-radius: 4px;
  flex: 1;
  width: 100%;
  resize: none;

  ${({ $isLarge }) =>
    $isLarge &&
    css`
      flex: auto;
      height: 8rem;
    `}
`;

export const ErrorMsg = styled.p`
  color: #f03022;
  font-size: 0.8rem;
  text-align: center;
`;
