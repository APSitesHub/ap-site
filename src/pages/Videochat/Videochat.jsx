import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Title,
  SubTitle,
  Label,
  Input,
  Button,
  RoomList,
  RoomItem,
  JoinButton
} from './Videochat.styled';

axios.defaults.baseURL = 'http://localhost:3001';

function Videochat() {
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);
  const newRoomName = useRef('');

  useEffect(() => {
    if (!getTeacherMail()) {
      navigate('../teacher-login');
    }

    getRooms();
  }, []);

  const createRoom = () => {
    const options = {
      name: newRoomName.current.value,
      userEmail: getTeacherMail(),
    };

    axios.post('/room/create', options);

    getRooms();
  };

  const getRooms = async () => {
    const rooms = await axios.get(`/room/byEmail?email=${getTeacherMail()}`);

    updateRooms(rooms.data)
  };

  const getTeacherMail = () => {
    return localStorage.getItem('mail');
  }

  return (
    <Container>
      <Title>Logined as {getTeacherMail()}</Title>

      <div>
        <SubTitle>Create Room</SubTitle>
      </div>

      <Label htmlFor="room-name">Room name:</Label>
      <Input type="text" id="room-name" ref={newRoomName} />

      <Button
        onClick={() => {
          createRoom();
        }}
      >
        Create New Room
      </Button>

      <RoomList>
        {rooms.map((room) => (
          <RoomItem key={room.id}>
            {room.name}
            <JoinButton
              onClick={() => {
                navigate(`/room/${room.id}`);
              }}
            >
              JOIN ROOM
            </JoinButton>
          </RoomItem>
        ))}
      </RoomList>
    </Container>
  );
}

export default Videochat;