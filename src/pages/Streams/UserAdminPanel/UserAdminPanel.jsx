import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  FilterButton,
  FilterPicker,
  FilterPickerButton,
  Filterable,
  LoginForm,
  UserBanButton,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
  UsersForm,
} from './UserAdminPanel.styled';
import { UserEditForm } from './UserEditForm/UserEditForm';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const DAYS_SET = [1, 3, 7, 14, 30];

export const UserAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [langs, setLangs] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [daysAfterLastLogin, setDaysAfterLastLogin] = useState(7);
  const [isManagerPickerOpen, setIsManagerPickerOpen] = useState(false);
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);
  const [isLevelPickerOpen, setIsLevelPickerOpen] = useState(false);
  const [isCoursePickerOpen, setIsCoursePickerOpen] = useState(false);

  const persistentUsers = useRef([]);
  const sortedUsers = useRef([]);

  useEffect(() => {
    document.title = 'User Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getUsers = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/users/admin/', {
            params: { isAdmin: isUserAdmin },
          });
          setUsers(users => (users = [...response.data.reverse()]));
          persistentUsers.current = [...response.data];
          setManagers(
            managers =>
              (managers = [
                ...response.data
                  .map(user => user.manager)
                  .filter((manager, i, arr) => arr.indexOf(manager) === i)
                  .sort(),
              ])
          );
          setLevels(
            levels =>
              (levels = [
                ...response.data
                  .map(user => user.knowledge)
                  .filter((level, i, arr) => arr.indexOf(level) === i)
                  .sort(),
              ])
          );
          setCourses(
            courses =>
              (courses = [
                ...response.data
                  .map(user => user.course)
                  .filter((course, i, arr) => arr.indexOf(course) === i)
                  .sort(),
              ])
          );
          setLangs(
            langs =>
              (langs = [
                ...response.data
                  .map(user => user.lang)
                  .filter((lang, i, arr) => arr.indexOf(lang) === i)
                  .sort(),
              ])
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isEditFormOpen) {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isLoading, isEditFormOpen]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const calculateDaysFilter = current => {
    setDaysAfterLastLogin(
      days =>
        (days = DAYS_SET[DAYS_SET.findIndex(days => current === days) + 1])
    );

    sortedUsers.current = [
      ...users.sort(
        (a, b) =>
          (changeDateFormat(a.visitedTime[a.visitedTime.length - 1]) || 0) -
          (changeDateFormat(b.visitedTime[b.visitedTime.length - 1]) || 0)
      ),
    ];

    setUsers(users => (users = [...sortedUsers.current]));
  };

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('.'))
        : Date.parse(dateString);
    }
    return;
  };

  const filterByManager = current =>
    current === '' && sortedUsers.current.length === 0
      ? setUsers(users => (users = [...persistentUsers.current]))
      : sortedUsers.current.length < 0
      ? setUsers(
          users =>
            (users = [
              ...sortedUsers.current.filter(user => user.manager === current),
            ])
        )
      : setUsers(
          users =>
            (users = [
              ...persistentUsers.current.filter(
                user => user.manager === current
              ),
            ])
        );

  const filterByCourse = current =>
    current === '' && sortedUsers.current.length === 0
      ? setUsers(users => (users = [...persistentUsers.current]))
      : sortedUsers.current.length < 0
      ? setUsers(
          users =>
            (users = [
              ...sortedUsers.current.filter(user => user.course === current),
            ])
        )
      : setUsers(
          users =>
            (users = [
              ...persistentUsers.current.filter(
                user => user.course === current
              ),
            ])
        );

  const filterByLang = current =>
    current === '' && sortedUsers.current.length === 0
      ? setUsers(users => (users = [...persistentUsers.current]))
      : sortedUsers.current.length < 0
      ? setUsers(
          users =>
            (users = [
              ...sortedUsers.current.filter(user => user.lang === current),
            ])
        )
      : setUsers(
          users =>
            (users = [
              ...persistentUsers.current.filter(user => user.lang === current),
            ])
        );

  const filterByLevel = current =>
    current === '' && sortedUsers.current.length === 0
      ? setUsers(users => (users = [...persistentUsers.current]))
      : sortedUsers.current.length < 0
      ? setUsers(
          users =>
            (users = [
              ...sortedUsers.current.filter(user => user.knowledge === current),
            ])
        )
      : setUsers(
          users =>
            (users = [
              ...persistentUsers.current.filter(
                user => user.knowledge === current
              ),
            ])
        );

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/users', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const initialUserValues = {
    name: '',
    mail: '',
    password: '',
    pupilId: '',
    age: '',
    lang: '',
    course: '',
    package: '',
    knowledge: '',
    manager: '',
  };

  const usersSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A"
      ),
    mail: yup.string().required("Пошта - обов'язкове поле!"),
    password: yup.string().required("Пароль - обов'язкове поле!"),
    pupilId: yup
      .string()
      .min(6, 'Не менше 6 цифр')
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри')
      .required("Обов'язкове поле, дивитись на платформі"),
    age: yup
      .string()
      .required(
        "Вік - обов'язкове поле, якщо віку з якоїсь причини ми не знаємо, введіть N/A"
      ),
    lang: yup
      .string()
      .optional()
      .matches(/^[A-Za-z0-9]+$/, 'Лише латинські літери'),
    course: yup.string().optional(),
    package: yup.string().optional(),
    knowledge: yup
      .string()
      .optional()
      .matches(/^[A-Za-z0-9]+$/, 'Лише латинські літери'),
    manager: yup
      .string()
      .required("Менеджер - обов'язкове поле, введіть прізвище"),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.pupilId = values.pupilId.trim().trimStart();
    values.age = values.age.trim().trimStart();
    values.lang = values.lang.toLowerCase().trim().trimStart();
    values.package = values.package.toLowerCase().trim().trimStart();
    values.knowledge = values.knowledge.toLowerCase().trim().trimStart();
    values.manager = values.manager.toLowerCase().trim().trimStart();
    try {
      const response = await axios.post('/users/new', values);
      console.log(response);
      resetForm();
      alert('Юзера додано');
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setUserToEdit(
      userToEdit => (userToEdit = users.find(user => user._id === id))
    );
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const toggleLevelPicker = () => {
    setIsLevelPickerOpen(isOpen => !isOpen);
  };

  const toggleCoursePicker = () => {
    setIsCoursePickerOpen(isOpen => !isOpen);
  };

  const toggleLangPicker = () => {
    setIsLangPickerOpen(isOpen => !isOpen);
  };

  const toggleManagerPicker = () => {
    setIsManagerPickerOpen(isOpen => !isOpen);
  };

  const handleDelete = async id => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.delete(`/users/${id}`);
      console.log(response);
      alert('Юзера видалено');
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleBan = async (id, isBanned) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.patch(
        `/users/${id}`,
        isBanned ? { isBanned: false } : { isBanned: true }
      );
      console.log(response);
      isBanned ? alert('Юзера розблоковано') : alert('Юзера заблоковано');
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <AdminPanelSection>
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
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <Formik
            initialValues={initialUserValues}
            onSubmit={handleUserSubmit}
            validationSchema={usersSchema}
          >
            <UsersForm>
              <Label>
                <AdminInput
                  type="text"
                  name="name"
                  placeholder="Прізвище та ім'я"
                />
                <AdminInputNote component="p" name="name" />
              </Label>
              <Label>
                <AdminInput
                  type="email"
                  name="mail"
                  placeholder="Електронна пошта (логін)"
                />
                <AdminInputNote component="p" name="mail" />
              </Label>
              <Label>
                <AdminInput type="text" name="password" placeholder="Пароль" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="pupilId"
                  placeholder="ID учня на платформі"
                />
                <AdminInputNote component="p" name="pupilId" />
              </Label>
              <Label>
                <AdminInput type="text" name="age" placeholder="Вік" />
                <AdminInputNote component="p" name="age" />
              </Label>
              <Label>
                <AdminInput type="text" name="lang" placeholder="Мова" />
                <AdminInputNote component="p" name="lang" />
              </Label>
              <Label>
                <AdminInput type="text" name="course" placeholder="Потік" />
                <AdminInputNote component="p" name="course" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="package"
                  placeholder="Пакет послуг"
                />
                <AdminInputNote component="p" name="package" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="knowledge"
                  placeholder="Рівень знань"
                />
                <AdminInputNote component="p" name="knowledge" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="manager"
                  placeholder="Прізвище відповідального менеджера"
                />
                <AdminInputNote component="p" name="manager" />
              </Label>
              <AdminFormBtn type="submit">Додати юзера</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>Список юзерів з доступом до уроків</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>ID</UserHeadCell>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Пошта (логін)</UserHeadCell>
                <UserHeadCell>Пароль</UserHeadCell>
                <UserHeadCell>ID на платформі</UserHeadCell>
                {/* <UserHeadCell>Апдейт</UserHeadCell> */}
                <UserHeadCell>
                  <Filterable>
                    Відвідини
                    <FilterButton
                      onClick={() => calculateDaysFilter(daysAfterLastLogin)}
                    ></FilterButton>
                    {daysAfterLastLogin}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>Відвідини з часом</Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Мова
                    <FilterButton onClick={toggleLangPicker}></FilterButton>
                    {isLangPickerOpen && (
                      <FilterPicker>
                        {langs.map((lang, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByLang(lang);
                              toggleLangPicker();
                            }}
                          >
                            {lang === undefined ? '—' : lang}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByLang('');
                            toggleLangPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Потік
                    <FilterButton onClick={toggleCoursePicker}></FilterButton>
                    {isCoursePickerOpen && (
                      <FilterPicker>
                        {courses.map((course, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByCourse(course);
                              toggleCoursePicker();
                            }}
                          >
                            {course === undefined ? '—' : course}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByCourse('');
                            toggleCoursePicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Знання
                    <FilterButton onClick={toggleLevelPicker}></FilterButton>
                    {isLevelPickerOpen && (
                      <FilterPicker>
                        {levels.map((level, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByLevel(level);
                              toggleLevelPicker();
                            }}
                          >
                            {level === undefined ? '—' : level}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByLevel('');
                            toggleLevelPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>Пакет послуг</UserHeadCell>
                <UserHeadCell className="filterable">
                  <Filterable>
                    Менеджер
                    <FilterButton onClick={toggleManagerPicker}></FilterButton>
                    {isManagerPickerOpen && (
                      <FilterPicker>
                        {managers.map((manager, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByManager(manager);
                              toggleManagerPicker();
                            }}
                          >
                            {manager === undefined ? '—' : manager}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByManager('');
                            toggleManagerPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
                <UserHeadCell>Ban</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {users.map(user => (
                <UserDBRow key={user._id}>
                  <UserCell>{user._id}</UserCell>
                  <UserCell>{user.name}</UserCell>
                  <UserCell>{user.mail}</UserCell>
                  <UserCell>{user.password}</UserCell>
                  <UserCell>{user.pupilId}</UserCell>
                  {/* <UserCell
                    className={
                      Math.floor(
                        (Date.now() - Date.parse(user.updatedAt)) / 86400000
                      ) > daysAfterLastLogin
                        ? 'attention'
                        : ''
                    }
                  >
                    {new Date(user.updatedAt).toLocaleString('uk-UA')}
                  </UserCell> */}
                  <UserCell
                    className={
                      Math.floor(
                        (Date.now() -
                          changeDateFormat(
                            user.visited[user.visited.length - 1]
                          )) /
                          86400000
                      ) > daysAfterLastLogin
                        ? 'attention'
                        : ''
                    }
                  >
                    {user.visited[user.visited.length - 1]}
                  </UserCell>
                  <UserCell>
                    {!user.visitedTime[user.visitedTime.length - 1]
                      ? ''
                      : user.visitedTime[user.visitedTime.length - 1].match(
                          '^202'
                        )
                      ? new Date(
                          user.visitedTime[user.visitedTime.length - 1]
                        ).toLocaleString('uk-UA')
                      : new Date(
                          changeDateFormat(
                            user.visitedTime[user.visitedTime.length - 1]
                          )
                        ).toLocaleString('uk-UA', { timeZone: '+06:00' })}
                  </UserCell>
                  <UserCell>{user.lang}</UserCell>
                  <UserCell>{user.course}</UserCell>
                  <UserCell
                    className={user.knowledge?.includes('а') && 'error'}
                  >
                    {user.knowledge}
                  </UserCell>
                  <UserCell>{user.package}</UserCell>
                  <UserCell className="last-name">{user.manager}</UserCell>
                  <UserCell>
                    {user.name === 'Dev Acc' ? null : (
                      <UserEditButton onClick={() => handleEdit(user._id)}>
                        Edit
                      </UserEditButton>
                    )}
                  </UserCell>
                  <UserCell>
                    {user.name === 'Dev Acc' ? null : (
                      <UserDeleteButton onClick={() => handleDelete(user._id)}>
                        Del
                      </UserDeleteButton>
                    )}
                  </UserCell>
                  <UserCell>
                    {user.name === 'Dev Acc' ? null : (
                      <UserBanButton
                        className={user.isBanned ? 'banned' : 'not_banned'}
                        onClick={() => handleBan(user._id, user.isBanned)}
                      >
                        {user.isBanned ? 'Unban' : 'Ban'}
                      </UserBanButton>
                    )}
                  </UserCell>
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onClick={closeEditFormOnClick} id="close-on-click">
            <UserEditForm
              userToEdit={userToEdit}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
