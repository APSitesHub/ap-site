import styled, { css } from 'styled-components';

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  min-width: 480px;
  width: min-content;
  min-height: min-content;
  background-color: #f8f8f8;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    min-width: auto;
    width: auto;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
  }
`;

export const FeedbackItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  width: 100%;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  padding: 8px;

  ${({ $isRow }) =>
    $isRow &&
    css`
      flex-direction: row;
      align-items: center;
    `}
`;
