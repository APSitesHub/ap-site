import { useState, useEffect, useRef } from 'react';
import socket from './utils/socket';
import ACTIONS from './utils/socket/actions';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

function Videochat() {
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    if (!getTeacherMail()) {
      navigate('../teacher-login');
    }

    const handleShareRooms = ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    };

    socket.on(ACTIONS.SHARE_ROOMS, handleShareRooms);

    return () => {
      socket.off(ACTIONS.SHARE_ROOMS, handleShareRooms);
    };
  }, []);

  const getTeacherMail = () => {
    return localStorage.getItem('mail')
  }

  return (
    <div ref={rootNode}>
      <h1>Logined as {getTeacherMail()}</h1>

      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`/room/${roomID}`);
              }}
            >
              JOIN ROOM
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          navigate(`/room/${v4()}`);
        }}
      >
        Create New Room
      </button>
    </div>
  );
}

export default Videochat;