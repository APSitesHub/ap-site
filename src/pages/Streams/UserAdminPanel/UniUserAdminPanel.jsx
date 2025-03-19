import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import {
  LabelText,
  SpeakingLabel,
} from 'pages/TeacherPage/TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm.styled';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  ErrorNote,
  TeacherLangSelect,
} from '../TeacherAdminPanel/TeacherAdminPanel.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
  UsersForm,
} from './UserAdminPanel.styled';
import { UniUserEditForm } from './UserEditForm/UniUserEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UserAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [uniValue, setUniValue] = useState(null);
  const [isUniEmpty, setIsUniEmpty] = useState(false);
  const [groupValue, setGroupValue] = useState(null);
  const [isGroupEmpty, setIsGroupEmpty] = useState(false);
  // eslint-disable-next-line
  const [daysAfterLastLogin, setDaysAfterLastLogin] = useState(7);
  const selectInputRef = useRef();

  const uniOptions = [
    {
      label: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
      value: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
    },
    {
      label: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
      value: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
    },
    {
      label: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
      value: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
    },
    {
      label: 'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)',
      value: 'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)',
    },
    {
      label: 'Merito (Uniwersytet WSB Merito Warszawa)',
      value: 'Merito (Uniwersytet WSB Merito Warszawa)',
    },
    {
      label: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
      value: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
    },
    {
      label: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
      value: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
    },
    {
      label: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
      value: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
    },
    {
      label: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
      value: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
    },
    {
      label: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
      value: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
    },
  ];

  const groupOptions = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
  ];

  useEffect(() => {
    document.title = 'Polish University Users Admin Panel | AP Education';

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
          const response = await axios.get('/uniusers/admin/');
          setUsers(users => (users = [...response.data.reverse()]));
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

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const onClear = () => {
    selectInputRef.current.clearValue();
  };

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

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
    crmId: '',
    contactId: '',
    pupilId: '',
    university: '',
    group: '',
  };

  const usersSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A"
      ),
    mail: yup.string().required("Пошта - обов'язкове поле!"),
    password: yup.string().required("Пароль - обов'язкове поле!"),
    crmId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    contactId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    pupilId: yup
      .string()
      .min(6, 'Не менше 6 цифр')
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри')
      .required("Обов'язкове поле, дивитись на платформі"),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.crmId = values.crmId ? +values.crmId.trim().trimStart() : undefined;
    values.contactId = values.contactId
      ? +values.contactId.trim().trimStart()
      : undefined;
    values.pupilId = values.pupilId.trim().trimStart();
    values.university = uniValue.value;
    values.group = groupValue.value;
    try {
      const response = await axios.post('/uniusers/new', values);
      console.log(response.data);
      setUsers(users => [response.data, ...users]);
      resetForm();
      onClear();
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
    userToUpdate.password = values.password;
    userToUpdate.pupilId = values.pupilId;
    userToUpdate.crmId = values.crmId;
    userToUpdate.contactId = values.contactId;
    userToUpdate.university = values.university;
    userToUpdate.group = values.group;

    console.log(userToUpdate);

    setUsers(
      users =>
        (users = users.map((user, i) =>
          i === users.findIndex(user => user._id === id) ? userToUpdate : user
        ))
    );
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
        const response = await axios.delete(`/uniusers/${id}`);
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
            <UsersForm>
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
                  placeholder="ID студента на платформі"
                />
                <AdminInputNote component="p" name="pupilId" />
              </Label>
              <SpeakingLabel>
                {uniValue && uniValue.value && <LabelText>Університет</LabelText>}
                <TeacherLangSelect
                  ref={selectInputRef}
                  options={uniOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      borderRadius: '50px',
                      minHeight: '34px',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      position: 'absolute',
                      zIndex: '2',
                      top: '36px',
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      padding: '7px',
                    }),
                  }}
                  placeholder="Університет"
                  name="uni"
                  onBlur={() => {
                    !uniValue
                      ? setIsUniEmpty(empty => (empty = true))
                      : setIsUniEmpty(empty => (empty = false));
                  }}
                  onChange={uni => {
                    setUniValue(uni);
                    uni?.value && setIsUniEmpty(empty => (empty = false));
                  }}
                />
                {isUniEmpty && <ErrorNote> Університет - обов'язкове поле!</ErrorNote>}
              </SpeakingLabel>
              <SpeakingLabel>
                {groupValue && groupValue.value && <LabelText>Група</LabelText>}
                <TeacherLangSelect
                  ref={selectInputRef}
                  options={groupOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      borderRadius: '50px',
                      minHeight: '34px',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      position: 'absolute',
                      zIndex: '2',
                      top: '36px',
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      padding: '7px',
                    }),
                  }}
                  placeholder="Група"
                  name="group"
                  onBlur={() => {
                    !groupValue
                      ? setIsGroupEmpty(empty => (empty = true))
                      : setIsGroupEmpty(empty => (empty = false));
                  }}
                  onChange={group => {
                    setGroupValue(group);
                    group?.value && setIsGroupEmpty(empty => (empty = false));
                  }}
                />
                {isGroupEmpty && <ErrorNote> Група - обов'язкове поле!</ErrorNote>}
              </SpeakingLabel>
              <AdminFormBtn type="submit">Додати юзера</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>Список юзерів з доступом до уроків</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>CRM&nbsp;Лід Контакт</UserHeadCell>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Пошта (логін)</UserHeadCell>
                <UserHeadCell>Пароль</UserHeadCell>
                <UserHeadCell>Університет</UserHeadCell>
                <UserHeadCell>Група</UserHeadCell>
                <UserHeadCell>ID на платформі</UserHeadCell>
                <UserHeadCell>Відвідини</UserHeadCell>
                <UserHeadCell>Відвідини з часом</UserHeadCell>
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {users.map(user => (
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
                  <UserCell>{user.password}</UserCell>
                  <UserCell className="last-name">{user.university}</UserCell>
                  <UserCell>{user.group ? user.group : '1'}</UserCell>
                  <UserCell>{user.pupilId}</UserCell>
                  <UserCell
                    className={
                      Math.floor(
                        (Date.now() -
                          changeDateFormat(user.visited[user.visited.length - 1])) /
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
                      : user.visitedTime[user.visitedTime.length - 1].match('^202')
                      ? new Date(
                          user.visitedTime[user.visitedTime.length - 1]
                        ).toLocaleString('uk-UA')
                      : new Date(
                          changeDateFormat(user.visitedTime[user.visitedTime.length - 1])
                        ).toLocaleString('uk-UA', { timeZone: '+06:00' })}
                  </UserCell>

                  <UserCell>
                    {/* {user.name === 'Dev Acc' ? null : ( */}
                    <UserEditButton onClick={() => handleEdit(user._id)}>
                      Edit
                    </UserEditButton>
                    {/* )} */}
                  </UserCell>
                  <UserCell>
                    {user.name === 'Dev Acc' ? null : (
                      <UserDeleteButton onClick={() => handleDelete(user._id)}>
                        Del
                      </UserDeleteButton>
                    )}
                  </UserCell>
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <UniUserEditForm
              userToEdit={userToEdit}
              updateUser={updateUser}
              closeEditForm={closeEditForm}
              uniOptions={uniOptions}
              groupOptions={groupOptions}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UserAdminPanel;
