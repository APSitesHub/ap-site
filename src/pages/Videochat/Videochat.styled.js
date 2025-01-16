import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const VideochatContainer = styled.div`
  background-color: darkslateblue;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 80%;
  padding: 36px;
  gap: 16px;
  max-width: 80%;
`;

export const MainVideo = styled.div`
  position: relative;
  background-color: black;
  width: 100%;
  height: 100%;
  flex-basis: 70%;
  max-height: 70%;
`;

export const UsersVideosContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex-basis: 30%;
  max-width: 100%;
`;

export const UserVideo = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  background-color: black;
  position: relative;
`;

export const ChatContainer = styled.div`
  background-color: beige;
  display: flex;
  flex-basis: 20%;
  flex-shrink: 0;
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
