import axios from 'axios';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Page } from '../Videochat.styled';
import Room from './Room';
import Login from './Login';
import { useParams } from 'react-router-dom';

function SpeakingMain() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [isGeneralRoom, setIsGeneralRoom] = useState(true);
  const socketRef = useRef(null);

  const connectToWaitingRoom = async () => {
    if (socketRef.current) {
      return;
    }

    const socket = io(`ws://localhost:3001/speaking`, {
      'force new connection': true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
    });

    socketRef.current = socket;

    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role')?.startsWith('user') ? 'user' : 'teacher';
    const login = localStorage.getItem('login') || localStorage.getItem('mail');
    const userId = localStorage.getItem('userId');

    socket.emit('join', {
      room: slug,
      userName,
      role,
      login,
      userId,
    });

    socket.on('redirect-to-room', handleRedirectToRoom);
  };

  const handleRedirectToRoom = ({ roomNumber }) => {
    setRoomNumber(roomNumber);
  };

  useEffect(() => {
    const localRole = localStorage.getItem('localRole');

    const refreshTeacherToken = async () => {
      try {
        const res = await axios.post('/teachers/refresh', {
          login: localStorage.getItem('login'),
        });

        localStorage.setItem('token', res.data.newToken);
        setIsAdmin(true);
        setIsUserLogined(true);
        connectToWaitingRoom();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const refreshUserToken = async () => {
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });

        localStorage.setItem('token', res.data.newToken);
        setIsAdmin(false);
        setIsUserLogined(true);
        connectToWaitingRoom();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsUserLogined(false);
      }
    };

    if (localRole === 'admin' || localStorage.getItem('login')?.startsWith('teacher')) {
      refreshTeacherToken();
    } else {
      refreshUserToken();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleLogin = isAdmin => {
    localStorage.setItem('localRole', isAdmin ? 'admin' : 'user');
    setIsAdmin(isAdmin);
    setIsUserLogined(true);
    connectToWaitingRoom();
  };

  return (
    <Page>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: '0 auto',
          }}
          wrapperClass="blocks-wrapper"
          colors={['#0f645b', '#0f645b', '#0f645b', '#0f645b', '#0f645b']}
        />
      ) : !isUserLogined ? (
        <Login logined={handleLogin} />
      ) : !roomNumber ? (
        <div>
          <h1>
            Ви в кімнаті очікування, щойно урок розпочнеться Вас буде перенаправлено
          </h1>
          <p>{socketRef.current.id}</p>
        </div>
      ) : (
        <Room isAdmin={isAdmin} roomId={`${slug}-${roomNumber}`} />
      )}
    </Page>
  );
}

export default SpeakingMain;
