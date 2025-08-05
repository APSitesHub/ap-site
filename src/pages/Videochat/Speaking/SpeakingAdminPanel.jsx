import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

function SpeakingAdminPanel() {
  const { room } = useParams();
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const connectToAdminPanel = async () => {
    const socket = io(`ws://localhost:3001/speaking`, {
      'force new connection': true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
    });

    socketRef.current = socket;

    const userName = 'ADMIN';
    const userId = 'ADMIN';
    const role = 'admin';
    const login = 'ADMIN';

    socket.emit('join', {
      room,
      userName,
      userId,
      role,
      login,
    });

    socket.on('users-in-room', updatedUsers => {
      setUsers(updatedUsers);
    });
    socket.on('teachers-in-room', updatedTeachers => {
      setTeachers(updatedTeachers);
    });
    socket.on('new-user', user => {
      console.log('New user joined:', user);

      if (user.role === 'teacher') {
        setTeachers(prevTeachers => [...prevTeachers, user]);
      } else {
        setUsers(prevUsers => [...prevUsers, user]);
      }
    });
    socket.on('user-disconnected', user => {
      if (user.role === 'teacher') {
        setTeachers(prevTeachers => prevTeachers.map(t => (t.disconnected = true)));
      } else {
        setUsers(prevUsers => prevUsers.map(u => (u.disconnected = true)));
      }
    });
    socket.on('user-reconnected', user => {
      if (user.role === 'teacher') {
        setTeachers(prevTeachers => prevTeachers.map(t => (t.disconnected = false)));
      } else {
        setUsers(prevUsers => prevUsers.map(u => (u.disconnected = false)));
      }
    });

    setIsConnected(true);
  };

  const distributeUsers = () => {
    if (teachers.length === 0) return;

    const totalUsers = [...users];
    const totalTeachers = [...teachers];
    const roomCount = totalTeachers.length;
    const usersPerRoom = Math.floor(totalUsers.length / roomCount);
    const extraUsers = totalUsers.length % roomCount;

    const newRooms = [];
    let userIndex = 0;

    const updatedUsers = [...totalUsers];
    const updatedTeachers = [...totalTeachers];

    for (let i = 0; i < roomCount; i++) {
      const roomNumber = i + 1;

      // Розраховуємо скільки користувачів у цій кімнаті
      const currentRoomUserCount = usersPerRoom + (i < extraUsers ? 1 : 0);
      const roomUsers = updatedUsers
        .slice(userIndex, userIndex + currentRoomUserCount)
        .map(user => ({
          ...user,
          roomNumber,
        }));

      // Оновлюємо сам масив юзерів зі зміною roomNumber
      for (let j = 0; j < roomUsers.length; j++) {
        const globalIndex = userIndex + j;
        updatedUsers[globalIndex] = roomUsers[j];
      }

      // Оновлюємо викладача з roomNumber
      const roomTeacher = {
        ...updatedTeachers[i],
        roomNumber,
      };
      updatedTeachers[i] = roomTeacher;

      // Створюємо кімнату
      newRooms.push({
        roomNumber,
        teacher: roomTeacher,
        users: roomUsers,
      });

      userIndex += currentRoomUserCount;
    }

    // Оновлюємо стейти
    setUsers(updatedUsers);
    setTeachers(updatedTeachers);
    setRooms(newRooms);
  };

  const saveChanges = () => {
    if (rooms.length === 0) return;

    socketRef.current.emit('save-rooms', { room, users: [...teachers, ...users] });

    console.log('Changes saved:', rooms);
  };

  const startLesson = () => {
    socketRef.current.emit('start-lesson', { room });
  };

  return (
    <div style={{ height: '100vh' }}>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#333',
          borderBottom: '2px solid #ccc',
          paddingBottom: '10px',
        }}
      >
        Speaking Admin Panel <strong>({room})</strong>
      </h1>
      {!isConnected ? (
        <button onClick={connectToAdminPanel}>CONNECT</button>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              height: '50px',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '2px solid #ccc',
              gap: '20px',
            }}
          >
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#244d9b',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={distributeUsers}
            >
              Розприділити
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#145e20',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={saveChanges}
            >
              Зберегти
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#17a194',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={startLesson}
            >
              Розпочати урок
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              flex: 1,
              borderBottom: '2px solid #ccc',
            }}
          >
            <div style={{ flex: 3, padding: '20px' }}>
              <h2
                style={{
                  paddingBottom: '10px',
                  borderBottom: '2px solid #ccc',
                }}
              >
                Users in Room {room} - {users.length}:
              </h2>
              <ul
                style={{
                  paddingTop: '10px',
                  listStyleType: 'none',
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {users
                  .filter(user => !user.roomNumber)
                  .map(user => (
                    <li
                      key={user.socketId}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '14px',
                        backgroundColor: '#f8d7da',
                        color: '#842029',
                      }}
                    >
                      <span>{user.userName}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div
              style={{
                height: '100%',
                width: '1px',
                backgroundColor: 'gray',
              }}
            ></div>

            <div style={{ flex: 1, padding: '20px' }}>
              <h2
                style={{
                  paddingBottom: '10px',
                  borderBottom: '2px solid #ccc',
                }}
              >
                Teachers in Room {room} - {teachers.length}:
              </h2>
              <ul
                style={{
                  paddingTop: '10px',
                  listStyleType: 'none',
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {teachers
                  .filter(teacher => !teacher.roomNumber)
                  .map(teacher => (
                    <li
                      key={teacher.socketId}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '14px',
                        backgroundColor: '#d1e7dd',
                        color: '#0f5132',
                      }}
                    >
                      <span>{teacher.userName}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              flex: 3,
              padding: '10px',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {rooms.map(room => (
              <div
                key={room.roomNumber}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #ced4da',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #ccc',
                  }}
                >
                  <p>{room.roomNumber}</p>
                  <p>Teacher: {room.teacher.userName}</p>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <p
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                    }}
                  >
                    Users:
                  </p>
                  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    {room.users.map(user => (
                      <li
                        style={{
                          padding: '6px 10px',
                          borderRadius: '14px',
                          backgroundColor: user.disconnected ? '#e7d1d1' : '#d1e7dd',
                          color: user.disconnected ? '#842029' : '#0f5132',
                          marginBottom: '6px',
                        }}
                      >
                        <span>{user.userName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakingAdminPanel;
