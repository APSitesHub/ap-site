import styled, { css } from 'styled-components';

// Room styles
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const VideochatContainer = styled.div`
  background-color: #0f645b;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 36px;
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;

  @media (max-width: 1024px) {
    padding: 16px;
    gap: 0;
  }
`;

export const MainVideoContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;

  @media (max-width: 1024px) {
    position: static;
    margin: 0;
  }

  @media (max-width: 768px) {
    margin: auto;
  }
`;

export const MainVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 0 500px rgba(0, 0, 0, 1);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

export const UsersVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;
  justify-content: center;
  min-width: 128px;
`;

export const UserVideo = styled.div`
  height: 20%;
  display: flex;
  flex-shrink: 0;
  background-color: black;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
  z-index: 1;

  ${({ $isUserVideo }) =>
    !$isUserVideo &&
    css`
      @media (max-width: 1024px) {
        display: none;
      }
    `}

  ${({ $isUserVideo }) =>
    $isUserVideo &&
    css`
      @media (max-width: 1024px) {
        position: absolute;
        left: 24px;
        top: 24px;
        border: 1px solid #09c6cc;
        width: 180px;
        height: auto;
      }

      @media (max-width: 768px) {
        width: 40%;
      }
    `}
`;

export const ChatContainer = styled.div`
  display: none;
  /* background-color: beige;
  display: flex;
  flex-basis: 20%;
  flex-shrink: 0; */
`;

export const ButtonsContainer = styled.div`
  background-color: transparent;
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 8px;
`;

export const MediaButtonContainer = styled.div`
  display: flex;
  border-radius: 16px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid gray;

  ${({ $isPagintionButton }) =>
    $isPagintionButton &&
    `
      @media (max-width: 1024px) {
        display: none;
      }
    `}
`;

export const MediaButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

export const MediaSelector = styled.select`
  background-color: transparent;
  color: white;
  cursor: pointer;
  padding: 8px;
  max-width: 20px;
  border: none;
  outline: none;
  border-left: 1px solid gray;
`;

export const MediaOption = styled.option`
  background-color: rgba(0, 0, 0, 0.7);
`;

export const DisabledMicroIcon = styled.div`
  color: red;
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

// Videochat styles
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const SubTitle = styled.h3`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #444;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RoomList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const RoomItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const JoinButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;
