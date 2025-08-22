import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  SpeakingAdminPanelContainer,
  SpeakingAdminPanelTitle,
  SpeakingAdminPanelTopBar,
  SpeakingAdminPanelButton,
  SpeakingAdminPanelMain,
  SpeakingAdminPanelUsersBlock,
  SpeakingAdminPanelTeachersBlock,
  SpeakingAdminPanelBlockTitle,
  SpeakingAdminPanelUserList,
  SpeakingAdminPanelUserItem,
  SpeakingAdminPanelDivider,
  SpeakingAdminPanelRoomsBlock,
  SpeakingAdminPanelRoomCard,
  SpeakingAdminPanelRoomHeader,
  SpeakingAdminPanelRoomUsersTitle,
  SpeakingAdminPanelRoomUsersList,
  SpeakingAdminPanelRoomUserItem,
} from '../Videochat.styled';

function SpeakingAdminPanel() {
  const { room } = useParams();
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const connectToAdminPanel = async () => {
    const socket = io(`wss://ap-server-8qi1.onrender.com/speaking`, {
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

      // Використовуємо функціональне оновлення, щоб отримати актуальний стан
      setRooms(prevRooms => {
        // Створюємо нову копію масиву кімнат
        let newRooms = [...prevRooms];

        updatedUsers.forEach(user => {
          if (user.roomNumber) {
            // Знаходимо індекс існуючої кімнати
            const roomIndex = newRooms.findIndex(
              room => room.roomNumber === user.roomNumber
            );

            if (roomIndex !== -1) {
              // Якщо кімната знайдена, створюємо її копію і оновлюємо
              const roomToUpdate = { ...newRooms[roomIndex] };

              // Додаємо користувача, якщо його ще немає в кімнаті
              const userExists = roomToUpdate.users.some(u => u.userId === user.userId);
              if (!userExists) {
                roomToUpdate.users = [...roomToUpdate.users, user];
              }
              newRooms[roomIndex] = roomToUpdate;
            } else {
              // Якщо кімнати не існує, створюємо її та додаємо до нового масиву
              newRooms.push({
                roomNumber: user.roomNumber,
                users: [user],
              });
            }
          }
        });

        return newRooms; // Повертаємо новий масив для оновлення стану
      });
    });

    socket.on('teachers-in-room', updatedTeachers => {
      setTeachers(updatedTeachers);

      // Використовуємо функціональне оновлення, щоб отримати актуальний стан
      setRooms(prevRooms => {
        let newRooms = [...prevRooms];

        updatedTeachers.forEach(teacher => {
          if (teacher.roomNumber) {
            const roomIndex = newRooms.findIndex(
              room => room.roomNumber === teacher.roomNumber
            );

            if (roomIndex !== -1) {
              // Створюємо копію кімнати і оновлюємо викладача
              const roomToUpdate = { ...newRooms[roomIndex] };
              roomToUpdate.teacher = teacher;
              newRooms[roomIndex] = roomToUpdate;
            } else {
              // Якщо кімнати не існує, створюємо її та додаємо викладача
              newRooms.push({
                roomNumber: teacher.roomNumber,
                teacher,
                users: [], // Важливо ініціалізувати масив користувачів
              });
            }
          }
        });

        return newRooms; // Повертаємо новий масив для оновлення стану
      });
    });

    socket.on('new-user', user => {
      if (user.role === 'teacher') {
        setTeachers(prevTeachers => [...prevTeachers, user]);
      } else {
        setUsers(prevUsers => [...prevUsers, user]);
      }
    });

    socket.on('user-disconnected', user => {
      if (user.role === 'teacher') {
        setTeachers(prevTeachers =>
          prevTeachers.map(t =>
            t.userId === user.userId ? { ...t, disconnected: true } : t
          )
        );
      } else {
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.userId === user.userId ? { ...u, disconnected: true } : u
          )
        );
      }
    });

    socket.on('user-reconnected', user => {
      if (user.role === 'teacher') {
        setTeachers(prevTeachers =>
          prevTeachers.map(t =>
            t.userId === user.userId ? { ...t, disconnected: false } : t
          )
        );
      } else {
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.userId === user.userId ? { ...u, disconnected: false } : u
          )
        );
      }
    });

    setIsConnected(true);
  };

  const distributeToGeneralRoom = () => {
    users.forEach(user => {
      user.roomNumber = null;
    });

    teachers.forEach(teacher => {
      teacher.roomNumber = null;
    });

    setRooms([]);
    setUsers([...users]);
    setTeachers([...teachers]);
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
    socketRef.current.emit('save-rooms', { room, users: [...teachers, ...users] });
  };

  const redirect = () => {
    saveChanges();
    socketRef.current.emit('start-lesson', { room });
  };

  const redirectWithDelay = () => {
    saveChanges();
    socketRef.current.emit('start-lesson', { room, withDelay: true });
  };

  const endLesson = () => {
    socketRef.current.emit('end-lesson', { room });
    setIsConnected(false);
    setRooms([]);
    setUsers([]);
    setTeachers([]);
    socketRef.current.disconnect();
  };

  // drag and drop functionality
  const handleDragStart = (e, user) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(user));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDropUser = (e, targetRoomNumber) => {
    e.preventDefault();
    const user = JSON.parse(e.dataTransfer.getData('text/plain'));

    // Оновлюємо users та rooms
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.userId === user.userId ? { ...u, roomNumber: targetRoomNumber } : u
      )
    );

    setRooms(prevRooms => {
      const newRooms = prevRooms.map(r => {
        // Видаляємо користувача з будь-якої іншої кімнати
        const updatedUsers = r.users.filter(u => u.userId !== user.userId);
        return { ...r, users: updatedUsers };
      });

      const roomToUpdateIndex = newRooms.findIndex(
        r => r.roomNumber === targetRoomNumber
      );
      if (roomToUpdateIndex !== -1) {
        const roomToUpdate = { ...newRooms[roomToUpdateIndex] };
        roomToUpdate.users = [...roomToUpdate.users, user];
        newRooms[roomToUpdateIndex] = roomToUpdate;
      }
      return newRooms;
    });
  };

  const handleDropToMainUsers = e => {
    e.preventDefault();
    const user = JSON.parse(e.dataTransfer.getData('text/plain'));

    setUsers(prevUsers =>
      prevUsers.map(u => (u.userId === user.userId ? { ...u, roomNumber: null } : u))
    );

    setRooms(prevRooms =>
      prevRooms.map(r => {
        const updatedUsers = r.users.filter(u => u.userId !== user.userId);
        return { ...r, users: updatedUsers };
      })
    );
  };

  return (
    <SpeakingAdminPanelContainer>
      <SpeakingAdminPanelTitle>
        Speaking Admin Panel <strong>({room})</strong>
      </SpeakingAdminPanelTitle>
      {!isConnected ? (
        <SpeakingAdminPanelButton onClick={connectToAdminPanel}>
          CONNECT
        </SpeakingAdminPanelButton>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SpeakingAdminPanelTopBar>
            <SpeakingAdminPanelButton onClick={distributeToGeneralRoom}>
              Скинути кімнати
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton onClick={distributeUsers}>
              Розподілити
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton $color={'red'} onClick={endLesson}>
              Закінчити урок
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton $color={'green'} onClick={redirect}>
              Редірект
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton $color={'green'} onClick={redirectWithDelay}>
              Редірект з затримкою
            </SpeakingAdminPanelButton>
          </SpeakingAdminPanelTopBar>

          <SpeakingAdminPanelMain>
            <SpeakingAdminPanelUsersBlock
              onDragOver={handleDragOver}
              onDrop={handleDropToMainUsers}
            >
              <SpeakingAdminPanelBlockTitle>
                Users in Room {room} - {users.length}:
              </SpeakingAdminPanelBlockTitle>
              <SpeakingAdminPanelUserList>
                {users
                  .filter(user => !user.roomNumber)
                  .map(user => (
                    <SpeakingAdminPanelUserItem
                      key={user.socketId}
                      $disconnected={user.disconnected}
                      draggable
                      onDragStart={e => handleDragStart(e, user)}
                    >
                      <span>{user.userName}</span>
                    </SpeakingAdminPanelUserItem>
                  ))}
              </SpeakingAdminPanelUserList>
            </SpeakingAdminPanelUsersBlock>

            <SpeakingAdminPanelDivider />

            <SpeakingAdminPanelTeachersBlock>
              <SpeakingAdminPanelBlockTitle>
                Teachers in Room {room} - {teachers.length}:
              </SpeakingAdminPanelBlockTitle>
              <SpeakingAdminPanelUserList>
                {teachers
                  .filter(teacher => !teacher.roomNumber)
                  .map(teacher => (
                    <SpeakingAdminPanelUserItem
                      key={teacher.socketId}
                      $disconnected={teacher.disconnected}
                    >
                      <span>{teacher.userName}</span>
                    </SpeakingAdminPanelUserItem>
                  ))}
              </SpeakingAdminPanelUserList>
            </SpeakingAdminPanelTeachersBlock>
          </SpeakingAdminPanelMain>

          <SpeakingAdminPanelRoomsBlock>
            {rooms &&
              rooms.map(room => (
                <SpeakingAdminPanelRoomCard
                  key={room.roomNumber}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDropUser(e, room.roomNumber)}
                >
                  <SpeakingAdminPanelRoomHeader>
                    {teachers
                      .filter(teacher => teacher.login === room.teacher?.login)
                      .map(teacher => (
                        <SpeakingAdminPanelRoomUserItem
                          key={teacher.userId}
                          $disconnected={teacher.disconnected}
                        >
                          <span>{teacher.userName}</span>
                        </SpeakingAdminPanelRoomUserItem>
                      ))}
                  </SpeakingAdminPanelRoomHeader>
                  <div style={{ marginTop: '10px' }}>
                    <SpeakingAdminPanelRoomUsersTitle>
                      Users:
                    </SpeakingAdminPanelRoomUsersTitle>
                    <SpeakingAdminPanelRoomUsersList>
                      {users
                        .filter(user => user.roomNumber === room.roomNumber)
                        .map(user => (
                          <SpeakingAdminPanelRoomUserItem
                            key={user.userId}
                            $disconnected={user.disconnected}
                            draggable
                            onDragStart={e => handleDragStart(e, user)}
                          >
                            <span>{user.userName}</span>
                          </SpeakingAdminPanelRoomUserItem>
                        ))}
                    </SpeakingAdminPanelRoomUsersList>
                  </div>
                </SpeakingAdminPanelRoomCard>
              ))}
          </SpeakingAdminPanelRoomsBlock>
        </div>
      )}
    </SpeakingAdminPanelContainer>
  );
}

export default SpeakingAdminPanel;
