import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from './utils/api/getRooms';
import { createRoom } from './utils/api/createRoom';
import {
  Page,
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
  BackButton,
  BackIcon,
  RoomListContainer,
  RoomTitle,
  RoomInfo,
} from './Videochat.styled';
import { getKahoots } from './utils/api/getKahoots';
import { getToken } from './utils/api/getToken';
import axios from 'axios';

const ROOM_TYPES = {
  TRIAL: 'trial',
  STREAM: 'stream',
  // C2U: 'close2you',
  INDIVIDUAL: 'individual',
};

function Videochat() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomLevels, setRoomLevels] = useState([]);
  const newRoomName = useRef('');
  const newRoomLevel = useRef(null);
  const newRoomType = useRef(ROOM_TYPES.VIDEOCHAT);

  useEffect(() => {
    if (!getToken()) {
      handleBack();
    }

    const refreshToken = async () => {
      try {
        const res = await axios.post('/teachers/refresh', {
          login: localStorage.getItem('login'),
        });
        localStorage.setItem('token', res.data.newToken);
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const updateRoomLevels = async () => {
      const levels = await getKahoots();

      setRoomLevels(levels);
    };

    updateRoomLevels();
    updateRooms();
    // eslint-disable-next-line
  }, []);

  const handleBack = () => {
    navigate('../teacher-ap');
  };

  const updateRooms = async () => {
    const rooms = await getRooms();

    setRooms(rooms);
  };

  const handleCreateRoom = async () => {
    await createRoom(
      newRoomType.current.value,
      newRoomName.current.value,
      newRoomLevel.current.value
    );
    await updateRooms();
  };

  return (
    <Page>
      <Container>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <Title>Logined as Teacher</Title>

        <div>
          <SubTitle>Create Room</SubTitle>
        </div>

        <FormGroup>
          <Label htmlFor="room-name">Room name:</Label>
          <Input type="text" id="room-name" ref={newRoomName} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="room-level">Room type:</Label>
          <Select id="room-level" ref={newRoomLevel}>
            {roomLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
          <Select id="room-type" ref={newRoomType}>
            {Object.entries(ROOM_TYPES).map(([key, label]) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button onClick={handleCreateRoom}>Create New Room</Button>

        <RoomListContainer>
          {Object.values(ROOM_TYPES).map(type => (
            <>
              <RoomList>
                <SubTitle>{type}</SubTitle>
                {rooms
                  .filter(room => room.type === type)
                  .map(room => (
                    <RoomItem key={room.id}>
                      <div>
                        <RoomTitle>{room.name}</RoomTitle>
                        <RoomInfo>{room.slug}</RoomInfo>
                      </div>
                      <JoinButton
                        onClick={() => {
                          navigate(`/room/${room.type}/${room.slug}/${room.id}`);
                        }}
                      >
                        JOIN ROOM
                      </JoinButton>
                    </RoomItem>
                  ))}
              </RoomList>
            </>
          ))}
        </RoomListContainer>
      </Container>
    </Page>
  );
}

export default Videochat;
