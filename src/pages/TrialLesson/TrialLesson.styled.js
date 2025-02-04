import styled from 'styled-components';

export const TrialLessonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  position: relative;
  overflow: hidden;
  padding: 20px;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 200px;
    left: 0;
    z-index: 0;
    background: linear-gradient(to bottom, rgba(15, 100, 91, 1), rgba(252, 70, 107, 0));
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(15, 100, 91, 1), rgba(252, 70, 107, 0));
  }
`;

export const LoadingMessage = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const Message = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const JoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const JoinMessage = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  max-width: 70%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const JoinButton = styled.button`
  padding: 20px 30px;
  background-color: #0f645b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.5rem;
  cursor: pointer;
  max-width: fit-content;

  @media (max-width: 768px) {
    padding: 15px 25px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;
