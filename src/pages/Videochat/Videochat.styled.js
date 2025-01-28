import styled from 'styled-components';

// Room styles
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
