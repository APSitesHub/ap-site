import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from './utils/api/getRooms';
import { createRoom } from './utils/api/createRoom';
import { getToken } from './utils/api/getToken';
import {
  Container,
  Title,
  SubTitle,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  RoomList,
  RoomItem,
  JoinButton,
} from './Videochat.styled';
import { getKahoots } from './utils/api/getKahoots';

function Videochat() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomLevels, setRoomLevels] = useState([]);
  const newRoomName = useRef('');
  const newRoomLevel = useRef(null);

  useEffect(() => {
    if (!getToken()) {
      navigate('../teacher-login');
    }

    const updateRoomLevels = async () => {
      const levels = await getKahoots();

      setRoomLevels(levels);
    };

    updateRoomLevels();
    updateRooms();
    // eslint-disable-next-line
  }, []);

  const updateRooms = async () => {
    const rooms = await getRooms();

    setRooms(rooms);
  };

  const handleCreateRoom = async () => {
    await createRoom(newRoomName.current.value, newRoomLevel.current.value);
    await updateRooms();
  };

  return (
    <Container>
      <Title>Logined as Teacher</Title>

      <div>
        <SubTitle>Create Room</SubTitle>
      </div>

      <FormGroup>
        <Label htmlFor="room-name">Room name:</Label>
        <Input type="text" id="room-name" ref={newRoomName} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="room-level">Room level:</Label>
        <Select id="room-level" ref={newRoomLevel}>
          {roomLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button onClick={handleCreateRoom}>Create New Room</Button>

      <RoomList>
        {rooms.map(room => (
          <RoomItem key={room.id}>
            {room.name}
            <JoinButton
              onClick={() => {
                navigate(`/room/${room.slug}/${room.id}`);
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
