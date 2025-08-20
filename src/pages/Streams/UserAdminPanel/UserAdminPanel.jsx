import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  CheckboxLabel,
  TeacherFilterInput,
} from '../AppointmentsAdminPanel/AppointmentsAdminPanel.styled';
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
  SliceUsersButton,
  SliceUsersButtonBox,
  SliceUsersButtonText,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
  UsersDBForm,
} from './UserAdminPanel.styled';
import { UserEditForm } from './UserEditForm/UserEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const DAYS_SET = [1, 3, 7, 14, 30];

const UserAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    manager: '',
    course: '',
    lang: '',
    level: '',
    days: '',
  });
  const [slicer, setSlicer] = useState(100);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [isManagerPickerOpen, setIsManagerPickerOpen] = useState(false);
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);
  const [isDaysPickerOpen, setIsDaysPickerOpen] = useState(false);
  const [isLevelPickerOpen, setIsLevelPickerOpen] = useState(false);
  const [isCoursePickerOpen, setIsCoursePickerOpen] = useState(false);
  const [studentFilter, setStudentFilter] = useState('');

  const persistentUsers = useRef([]);

  useEffect(() => {
    document.title = 'User Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          setAuthToken(res.data.newToken);
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
          const response = await axios.get('/users/admin/');
          setUsers(users => (users = [...response.data.reverse()]));
          persistentUsers.current = [...response.data.reverse()];
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();

    const onEscapeClose = event => {
      if (event.code === 'Escape') {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin]);

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

  const displayedUsers = useMemo(() => {
    let list = users;

    if (filters.manager) {
      list = list.filter(u => u.manager === filters.manager);
    }
    if (filters.course) {
      list = list.filter(u => u.course === filters.course);
    }
    if (filters.lang) {
      list = list.filter(u => u.lang === filters.lang);
    }
    if (filters.level) {
      list = list.filter(u => u.knowledge === filters.level);
    }
    if (filters.days) {
      list = list.filter(u =>
        u.visited.length > 0
          ? (Date.now() - changeDateFormat(u.visited.at(-1))) / 86400000 > filters.days
          : false
      );
    }

    return list;
  }, [filters, users]);

  const managers = useMemo(() => [...new Set(users.map(u => u.manager))].sort(), [users]);
  const courses = useMemo(() => [...new Set(users.map(u => u.course))].sort(), [users]);
  const langs = useMemo(() => [...new Set(users.map(u => u.lang))].sort(), [users]);
  const levels = useMemo(() => [...new Set(users.map(u => u.knowledge))].sort(), [users]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const filterByManager = value =>
    setFilters(filters => (filters = { ...filters, manager: value }));
  const filterByCourse = value =>
    setFilters(filters => (filters = { ...filters, course: value }));
  const filterByLang = value =>
    setFilters(filters => (filters = { ...filters, lang: value }));
  const filterByLevel = value =>
    setFilters(filters => (filters = { ...filters, level: value }));
  const filterByDays = value =>
    setFilters(filters => (filters = { ...filters, days: value }));

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
    zoomMail: '',
    password: '',
    crmId: '',
    contactId: '',
    pupilId: '',
    marathonNumber: '',
    age: '',
    adult: true,
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
    zoomMail: yup.string(),
    password: yup.string().required("Пароль - обов'язкове поле!"),
    crmId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    contactId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    pupilId: yup
      .string()
      .min(6, 'Не менше 6 цифр')
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри')
      .required("Обов'язкове поле, дивитись на платформі"),
    marathonNumber: yup
      .string()
      .max(1, 'Не більше 1 цифри')
      .matches(/[12]/, 'Лише цифри 1 або 2'),
    age: yup
      .string()
      .required(
        "Вік - обов'язкове поле, якщо віку з якоїсь причини ми не знаємо, введіть N/A"
      ),
    lang: yup
      .string()
      .required("Мова - обов'язкове поле")
      .matches(/^[A-Za-z0-9/]+$/, 'Лише латинські літери'),
    course: yup
      .string()
      .required(
        "Обов'язкове поле, для тестових юзерів або нерозподілених користувачів введіть 0"
      ),
    package: yup.string().optional(),
    // .matches(/^[A-Za-z0-9/]+$/, 'Лише латинські літери'),
    knowledge: yup
      .string()
      .optional()
      .matches(/^[A-Za-z0-9_/]+$/, 'Лише латинські літери'),
    manager: yup.string().required("Менеджер - обов'язкове поле, введіть прізвище"),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.zoomMail = values.zoomMail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.crmId = values.crmId ? +values.crmId.trim().trimStart() : undefined;
    values.contactId = values.contactId
      ? +values.contactId.trim().trimStart()
      : undefined;
    values.pupilId = values.pupilId.trim().trimStart();
    values.marathonNumber = values.marathonNumber.trim().trimStart();
    values.age = values.age.trim().trimStart();
    values.adult = +values.age >= 18 ? true : false;
    values.lang = values.lang.toLowerCase().trim().trimStart();
    values.package = values.package.toLowerCase().trim().trimStart();
    values.knowledge = values.knowledge.toLowerCase().trim().trimStart();
    values.manager = values.manager.toLowerCase().trim().trimStart();
    try {
      const response = await axios.post('/users/new', values);
      setUsers(users => [response.data, ...users]);
      resetForm();
      alert('Юзера додано');
    } catch (error) {
      console.error(error);
      alert('Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setUserToEdit(userToEdit => (userToEdit = users.find(user => user._id === id)));
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const updateUser = (id, values) => {
    const userToUpdate = users.find(user => user._id === id);
    userToUpdate.name = values.name;
    userToUpdate.mail = values.mail;
    userToUpdate.zoomMail = values.zoomMail;
    userToUpdate.password = values.password;
    userToUpdate.pupilId = values.pupilId;
    userToUpdate.marathonNumber = values.marathonNumber;
    userToUpdate.crmId = values.crmId;
    userToUpdate.contactId = values.contactId;
    userToUpdate.age = values.age;
    userToUpdate.adult = values.adult;
    userToUpdate.lang = values.lang;
    userToUpdate.package = values.package;
    userToUpdate.course = values.course;
    userToUpdate.knowledge = values.knowledge;
    userToUpdate.manager = values.manager;

    setUsers(
      users =>
        (users = users.map((user, i) =>
          i === users.findIndex(user => user._id === id) ? userToUpdate : user
        ))
    );
  };

  const toggleDaysSinceLastVisitPicker = () => {
    setIsDaysPickerOpen(isOpen => !isOpen);
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
    const areYouSure = window.confirm(
      `Точно видалити ${users.find(user => user._id === id).name}?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.delete(`/users/${id}`);
        console.log(response);
        alert('Юзера видалено');
        setUsers(users => (users = [...users.filter(user => user._id !== id)]));
      } catch (error) {
        console.error(error);
        alert('Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу');
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
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
                <AdminInput type="password" name="password" placeholder="Password" />
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
            <UsersDBForm>
              <Label>
                <AdminInput type="text" name="name" placeholder="Прізвище та ім'я" />
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
                <AdminInput
                  type="email"
                  name="zoomMail"
                  placeholder="Електронна пошта (Zoom)"
                />
                <AdminInputNote component="p" name="zoomMail" />
              </Label>
              <Label>
                <AdminInput type="text" name="password" placeholder="Пароль" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <Label>
                <AdminInput type="text" name="crmId" placeholder="ID ліда в CRM" />
                <AdminInputNote component="p" name="crmId" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="contactId"
                  placeholder="ID контакту в CRM"
                />
                <AdminInputNote component="p" name="contactId" />
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
                <AdminInput
                  type="text"
                  name="marathonNumber"
                  placeholder="№ марафону на платформі"
                />
                <AdminInputNote component="p" name="marathonNumber" />
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
                <AdminInput type="text" name="package" placeholder="Пакет послуг" />
                <AdminInputNote component="p" name="package" />
              </Label>
              <Label>
                <AdminInput type="text" name="knowledge" placeholder="Рівень знань" />
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
            </UsersDBForm>
          </Formik>
        )}
        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>
              Список юзерів з доступом до уроків
              <SliceUsersButtonBox>
                Максимум користувачів на сторінці:
                <SliceUsersButton
                  className={slicer === 50 && 'active'}
                  onClick={() => setSlicer(50)}
                >
                  <SliceUsersButtonText>50</SliceUsersButtonText>
                </SliceUsersButton>
                <SliceUsersButton
                  className={slicer === 100 && 'active'}
                  onClick={() => setSlicer(100)}
                >
                  <SliceUsersButtonText>100</SliceUsersButtonText>
                </SliceUsersButton>
                <SliceUsersButton
                  className={slicer === 500 && 'active'}
                  onClick={() => setSlicer(500)}
                >
                  <SliceUsersButtonText>500</SliceUsersButtonText>
                </SliceUsersButton>
                <SliceUsersButton
                  className={slicer === users.length && 'active'}
                  onClick={() => setSlicer(users.length)}
                >
                  <SliceUsersButtonText>Всі</SliceUsersButtonText>
                </SliceUsersButton>
              </SliceUsersButtonBox>
              <CheckboxLabel>
                <TeacherFilterInput
                  type="text"
                  name="studentFilter"
                  value={studentFilter}
                  onChange={e => setStudentFilter(e.target.value)}
                  placeholder="Почніть вводити ім'я чи пошту"
                />
              </CheckboxLabel>
            </UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>CRM&nbsp;Лід Контакт</UserHeadCell>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Пошта (логін)</UserHeadCell>
                <UserHeadCell>Zoom-пошта</UserHeadCell>
                <UserHeadCell>Пароль</UserHeadCell>
                <UserHeadCell>ID на платформі</UserHeadCell>
                <UserHeadCell>Номер марафону</UserHeadCell>
                <UserHeadCell>Юзера створено</UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Вхід на урок
                    <FilterButton onClick={toggleDaysSinceLastVisitPicker}></FilterButton>
                    {isDaysPickerOpen && (
                      <FilterPicker>
                        {DAYS_SET.map((days, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByDays(days);
                              toggleDaysSinceLastVisitPicker();
                            }}
                          >
                            {days === undefined ? '—' : days}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByDays('');
                            toggleDaysSinceLastVisitPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                    {filters.days}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>Вхід на плат.</Filterable>
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
              </UserDBRow>
            </thead>
            <tbody>
              {(() => {
                const foundUsers = studentFilter
                  ? displayedUsers.filter(user =>
                      user.name
                        .toLowerCase()
                        .includes(
                          studentFilter.toLowerCase().trim() ||
                            user.mail
                              .toLowerCase()
                              .includes(studentFilter.toLowerCase().trim())
                        )
                    )
                  : [...displayedUsers];

                return foundUsers.slice(0, slicer).map(user => (
                  <UserDBRow key={user._id}>
                    <UserCell>
                      <a
                        href={`https://apeducation.kommo.com/leads/detail/${user.crmId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.crmId}
                      </a>{' '}
                      <a
                        href={`https://apeducation.kommo.com/contacts/detail/${user.contactId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.contactId}
                      </a>
                    </UserCell>
                    <UserCell>{user.name}</UserCell>
                    <UserCell>{user.mail}</UserCell>
                    <UserCell>{user.zoomMail}</UserCell>
                    <UserCell>{user.password}</UserCell>
                    <UserCell>{user.pupilId}</UserCell>
                    <UserCell>{user.marathonNumber}</UserCell>
                    <UserCell>
                      {new Date(user.createdAt).toLocaleDateString('uk-UA')}
                    </UserCell>
                    <UserCell
                      className={
                        Math.floor(
                          (Date.now() -
                            changeDateFormat(user.visited[user.visited.length - 1])) /
                            86400000
                        ) > filters.days
                          ? 'attention'
                          : ''
                      }
                    >
                      {user.visited[user.visited.length - 1]}
                    </UserCell>
                    <UserCell>
                      {!user.visitedTime[user.visitedTime.length - 1]
                        ? ''
                        : user.visitedTime[user.visitedTime.length - 1].match('^202')
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
                    <UserCell className={user.knowledge?.includes('а') && 'error'}>
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
                  </UserDBRow>
                ));
              })()}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <UserEditForm
              userToEdit={userToEdit}
              updateUser={updateUser}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UserAdminPanel;
