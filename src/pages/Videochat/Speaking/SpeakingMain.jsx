import axios from 'axios';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Page, SpeakingAdminPanelTimer } from '../Videochat.styled';
import Room from './Room';
import Login from './Login';
import { useNavigate, useParams } from 'react-router-dom';

function SpeakingMain() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminInRoom, setIsAdminInRoom] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);
  const socketRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const timerInterval = useRef(null);

  const connectToWaitingRoom = async () => {
    if (socketRef.current) {
      return;
    }

    const socket = io(`wss://ap-server-8qi1.onrender.com/speaking`, {
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
      disconnected: false,
    });

    socket.on('is-admin-in-room', handleIsAdminInRoom);
    socket.on('redirect-to-room', handleRedirectToRoom);
    socket.on('end-lesson', handleEndLesson);
  };

  const handleIsAdminInRoom = ({ isAdminInRoom }) => {
    setIsAdminInRoom(isAdminInRoom);
  };

  const handleRedirectToRoom = ({ roomNumber, withDelay }) => {
    if (withDelay) {
      setTimer(60);
      timerInterval.current && clearInterval(timerInterval.current);

      timerInterval.current = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(timerInterval.current);
            setRoomNumber(roomNumber);

            return 0;
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
      setTimer(null);
      setRoomNumber(roomNumber);
    }
  };

  const handleEndLesson = () => {
    setTimer(60);
    timerInterval.current && clearInterval(timerInterval.current);

    timerInterval.current = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(timerInterval.current);
          isAdmin ? navigate('../../teacher-ap') : navigate('../../end-call');
          return 0;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
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

  const renderTimer = () => {
    if (timer === null || timer === undefined) return null;
    const min = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const sec = (timer % 60).toString().padStart(2, '0');
    return (
      <SpeakingAdminPanelTimer>
        {min}:{sec}
      </SpeakingAdminPanelTimer>
    );
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
      ) : !isAdminInRoom ? (
        <div>
          <h1>
            За цим посиланням наразі немає заняття. Можливо, воно скоро розпочнеться
          </h1>
        </div>
      ) : (
        <>
          <Room isAdmin={isAdmin} roomId={`${slug}-${roomNumber || 'general'}`} />
          {timer && renderTimer()}
        </>
      )}
    </Page>
  );
}

export default SpeakingMain;
