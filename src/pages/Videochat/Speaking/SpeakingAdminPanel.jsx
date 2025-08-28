import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import * as yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { Label } from 'components/LeadForm/LeadForm.styled';
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
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from '../../Streams/AdminPanel/AdminPanel.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

function SpeakingAdminPanel() {
  const { room } = useParams();
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLessonStarted, setIsLessonStarted] = useState(false);

  useEffect(() => {
    document.title = 'Speaking Admin Panel | AP Education';

    const refreshToken = async () => {
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/', {});
          setIsUserAdmin(true);
          setAuthToken(res.data.newToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, [isUserAdmin]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/admins/login', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(true);
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

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
        if (isLessonStarted) {
          user.roomNumber = getRoomNumberForNewUser();
          setUsers(prevUsers => {
            const newUsers = [...prevUsers, user];
            saveChanges(newUsers);
            redirect();
            return newUsers;
          });

          return;
        }

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

  const getRoomNumberForNewUser = () => {
    if (rooms.length === 0) return 1;

    // Знаходимо кімнату з найменшою кількістю користувачів
    let targetRoom = rooms[0];
    rooms.forEach(room => {
      if (room.users.length < targetRoom.users.length) {
        targetRoom = room;
      }
    });

    return targetRoom.roomNumber;
  };

  const distributeToGeneralRoom = () => {
    toast(
      t => (
        <span>
          <span>
            <strong>Ви впевнені, що хочете закрити всі кімнати?</strong>
          </span>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <SpeakingAdminPanelButton
              $color={'green'}
              onClick={() => {
                users.forEach(user => {
                  user.roomNumber = null;
                });
                teachers.forEach(teacher => {
                  teacher.roomNumber = null;
                });
                setRooms([]);
                setUsers([...users]);
                setTeachers([...teachers]);
                saveChanges();
                redirectWithDelay();
                setIsLessonStarted(false);
                toast.dismiss(t.id);
              }}
            >
              Так
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton $color={'red'} onClick={() => toast.dismiss(t.id)}>
              Скасувати
            </SpeakingAdminPanelButton>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
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

  const saveChanges = customUsers => {
    if (customUsers) {
      socketRef.current.emit('save-rooms', {
        room,
        users: [...teachers, ...customUsers],
      });
      return;
    } else {
      socketRef.current.emit('save-rooms', { room, users: [...teachers, ...users] });
    }
  };

  const redirect = () => {
    setIsLessonStarted(true);
    socketRef.current.emit('start-lesson', { room });
  };

  const redirectWithDelay = () => {
    socketRef.current.emit('start-lesson', { room, withDelay: true });
  };

  const endLesson = () => {
    toast(
      t => (
        <span>
          <span>
            <strong>Ви впевнені, що хочете закінчити урок?</strong>
          </span>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <SpeakingAdminPanelButton
              $color={'green'}
              onClick={() => {
                socketRef.current.emit('end-lesson', { room });
                setIsConnected(false);
                setRooms([]);
                setUsers([]);
                setTeachers([]);
                socketRef.current.disconnect();
                toast.dismiss(t.id);
              }}
            >
              Так
            </SpeakingAdminPanelButton>
            <SpeakingAdminPanelButton $color={'red'} onClick={() => toast.dismiss(t.id)}>
              Скасувати
            </SpeakingAdminPanelButton>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
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
      {!isUserAdmin && (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <Label>
              <AdminInput type="text" name="login" placeholder="Login" />
              <AdminInputNote component="p" name="login" />
            </Label>
            <Label>
              <AdminInput type="password" name="password" placeholder="Password" />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
          </LoginForm>
        </Formik>
      )}

      {isUserAdmin && (
        <>
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
                <SpeakingAdminPanelButton onClick={distributeUsers}>
                  Розподілити
                </SpeakingAdminPanelButton>
                <SpeakingAdminPanelButton
                  $color={'green'}
                  onClick={() => {
                    saveChanges();
                    redirect();
                  }}
                >
                  Редірект
                </SpeakingAdminPanelButton>
                <SpeakingAdminPanelButton
                  $color={'violet'}
                  onClick={distributeToGeneralRoom}
                >
                  Закрити кімнати
                </SpeakingAdminPanelButton>
                <SpeakingAdminPanelButton $color={'red'} onClick={endLesson}>
                  Закінчити урок
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
                          $draggable={true}
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
                          $draggable={false}
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
                              $draggable={false}
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
                                $draggable={true}
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
        </>
      )}
      {isLoading && <Loader />}
    </SpeakingAdminPanelContainer>
  );
}

export default SpeakingAdminPanel;
