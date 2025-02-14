import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from './utils/api/getRooms';
import { createRoom } from './utils/api/createRoom';
import { getToken } from './utils/api/getToken';
import { Container, Title, SubTitle, Label, Input, Button, RoomList, RoomItem, JoinButton } from './Videochat.styled';

function Videochat() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const newRoomName = useRef('');

  useEffect(() => {
    updateRooms();
    // eslint-disable-next-line
  }, []);

  const updateRooms = async () => {
    const rooms = await getRooms();

    setRooms(rooms);
  };

  const handleCreateRoom = async () => {
    await createRoom(newRoomName.current.value);

    await updateRooms();
  };

  return (
    <Container>
      <Title>Logined as Teacher</Title>

      <div>
        <SubTitle>Create Room</SubTitle>
      </div>

      <Label htmlFor="room-name">Room name:</Label>
      <Input type="text" id="room-name" ref={newRoomName} />

      <Button onClick={handleCreateRoom}>Create New Room</Button>

      <RoomList>
        {rooms.map(room => (
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
