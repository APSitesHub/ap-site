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
  ArrowDownIcon,
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
import { UserVisitedEditForm } from './UserEditForm/UserVisitedEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Univesitets = {
  PEDAGOGIUM: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
  WSTIJO: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
  WSBMIR: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
  EWSPA: 'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)',
  MERITO: 'Merito (Uniwersytet WSB Merito Warszawa)',
  WSTIH: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
  WSKM: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
  WSSIP: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
  WSPA: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
  WSE: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
  ANSWP: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
  SSW: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
  MANS: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
};

const translations = {
  pl: {
    loginPlaceholder: 'Login',
    passwordPlaceholder: 'Password',
    loginRequired: 'Podaj login!',
    passwordRequired: 'Podaj hasło!',
    loginButton: 'Zaloguj się',
    addUserButton: 'Dodaj użytkownika',
    userListCaption: 'Lista użytkowników z dostępem do lekcji',
    crmLeadContact: 'CRM&nbsp;Lider Kontakt',
    name: 'Nazwisko i imię',
    email: 'Poczta (login)',
    password: 'Hasło',
    university: 'Uniwersytet',
    group: 'Grupa',
    points: 'Punkty',
    platformId: 'ID na platformie',
    attendance: 'Obecność',
    visitsWithTime: 'Odwiedziny z czasem',
    deleteUserConfirmation: 'Czy na pewno usunąć',
    userDeleted: 'Użytkownik został usunięty',
    deleteUserError:
      'Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila',
    addUserError:
      'Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila',
    userAdded: 'Użytkownik został dodany',
    universityRequired: 'Uniwersytet - obowiązkowe pole!',
    groupRequired: 'Grupa - obowiązkowe pole!',
    userNameRequired:
      'Imię - obowiązkowe pole, jeśli imienia z jakiegoś powodu nie znamy, wpisz N/A',
    userEmailRequired: 'Poczta - obowiązkowe pole!',
    userPasswordRequired: 'Hasło - obowiązkowe pole!',
    crmIdDigitsOnly: 'Tylko cyfry',
    contactIdDigitsOnly: 'Tylko cyfry',
    pupilIdDigitsOnly: 'Tylko cyfry',
    pupilIdMinLength: 'Nie mniej niż 6 cyfr',
    pupilIdMaxLength: 'Nie więcej niż 7 cyfr',
    pupilIdRequired: 'Obowiązkowe pole, sprawdź na platformie',
  },
  ua: {
    loginPlaceholder: 'Логін',
    passwordPlaceholder: 'Пароль',
    loginRequired: 'Введіть логін!',
    passwordRequired: 'Введіть пароль!',
    loginButton: 'Залогінитись',
    addUserButton: 'Додати юзера',
    userListCaption: 'Список юзерів з доступом до уроків',
    crmLeadContact: 'CRM Лід Контакт',
    name: "Прізвище та ім'я",
    email: 'Пошта (логін)',
    password: 'Пароль',
    university: 'Університет',
    group: 'Група',
    points: 'Бали',
    platformId: 'ID на платформі',
    attendance: 'Відвідини',
    visitsWithTime: 'Відвідини з часом',
    deleteUserConfirmation: 'Точно видалити?',
    userDeleted: 'Юзера видалено',
    deleteUserError:
      'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу',
    addUserError:
      'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу',
    userAdded: 'Юзера додано',
    universityRequired: "Університет - обов'язкове поле!",
    groupRequired: "Група - обов'язкове поле!",
    userNameRequired:
      "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A",
    userEmailRequired: "Пошта - обов'язкове поле!",
    userPasswordRequired: "Пароль - обов'язкове поле!",
    crmIdDigitsOnly: 'Тільки цифри',
    contactIdDigitsOnly: 'Тільки цифри',
    pupilIdDigitsOnly: 'Тільки цифри',
    pupilIdMinLength: 'Не менше 6 цифр',
    pupilIdMaxLength: 'Не більше 7 цифр',
    pupilIdRequired: "Обов'язкове поле, дивитись на платформі",
  },
};

const UniUserAdminPanel = ({ uni, lang = 'ua' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isVisitedEditFormOpen, setIsVisitedEditFormOpen] = useState(false);
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
    {
      label: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
      value: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
    },
    {
      label: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
      value: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
    },
    {
      label: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
      value: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
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
    document.title = uni
      ? `${Univesitets[uni]} Admin Panel | AP Education`
      : 'Polish University Users Admin Panel | AP Education';

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
          const response = await axios.get(
            `/uniusers/admin/${uni ? uni.toLowerCase() : ''}`
          );

          setUsers(
            users =>
              (users = [
                ...response.data.reverse().sort((a, b) => a.name.localeCompare(b.name)),
              ])
          );
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
  }, [isUserAdmin, uni]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required(translations[lang]?.loginRequired),
    password: yup.string().required(translations[lang]?.passwordRequired),
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
    name: yup.string().required(translations[lang]?.userNameRequired),
    mail: yup.string().required(translations[lang]?.userEmailRequired),
    password: yup.string().required(translations[lang]?.userPasswordRequired),
    crmId: yup.string().matches(/^[0-9]*$/, translations[lang]?.crmIdDigitsOnly),
    contactId: yup.string().matches(/^[0-9]*$/, translations[lang]?.contactIdDigitsOnly),
    pupilId: yup
      .string()
      .min(6, translations[lang]?.pupilIdMinLength)
      .max(7, translations[lang]?.pupilIdMaxLength)
      .matches(/^\d{1,7}$/, translations[lang]?.pupilIdDigitsOnly)
      .required(translations[lang]?.pupilIdRequired),
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
    values.university = uni ? Univesitets[uni] : uniValue.value;
    values.group = groupValue.value;
    try {
      const response = await axios.post('/uniusers/new', values);
      console.log(response.data);
      setUsers(users => [response.data, ...users]);
      resetForm();
      onClear();
      alert(translations[lang]?.userAdded);
    } catch (error) {
      console.error(error);
      alert(translations[lang]?.addUserError);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setUserToEdit(userToEdit => (userToEdit = users.find(user => user._id === id)));
  };

  const handleVisitedEdit = async id => {
    setIsVisitedEditFormOpen(true);
    setUserToEdit(userToEdit => (userToEdit = users.find(user => user._id === id)));
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
    setIsVisitedEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
      setIsVisitedEditFormOpen(false);
    }
  };

  const updateUserVisits = (id, visits) => {
    setUsers(
      users =>
        (users = users.map((user, i) =>
          i === users.findIndex(user => user._id === id)
            ? { ...user, visited: visits }
            : user
        ))
    );
  };

  const updateUser = (id, values) => {
    const userToUpdate = users.find(user => user._id === id);
    userToUpdate.name = values.name;
    userToUpdate.mail = values.mail;
    userToUpdate.password = values.password;
    userToUpdate.pupilId = values.pupilId;
    userToUpdate.points = values.points;
    userToUpdate.crmId = values.crmId;
    userToUpdate.contactId = values.contactId;
    if (uni) {
      userToUpdate.university = values.university;
    }
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
      `${translations[lang]?.deleteUserConfirmation} ${
        users.find(user => user._id === id).name
      }?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.delete(`/uniusers/${id}`);
        console.log(response);
        alert(translations[lang]?.userDeleted);
        setUsers(users => (users = [...users.filter(user => user._id !== id)]));
      } catch (error) {
        console.error(error);
        alert(translations[lang]?.deleteUserError);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    }
  };

  const sortByGroup = () => {
    setUsers(users => [
      ...users.sort((a, b) => {
        if (!a.group) return 1;
        if (!b.group) return -1;
        return a.group.localeCompare(b.group);
      }),
    ]);
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
                <AdminInput
                  type="text"
                  name="login"
                  placeholder={translations[lang]?.loginPlaceholder}
                />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder={translations[lang]?.passwordPlaceholder}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">{translations[lang]?.loginButton}</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && !uni && (
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
                  placeholder={translations[lang]?.name}
                />
                <AdminInputNote component="p" name="name" />
              </Label>
              <Label>
                <AdminInput
                  type="email"
                  name="mail"
                  placeholder={translations[lang]?.email}
                />
                <AdminInputNote component="p" name="mail" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="password"
                  placeholder={translations[lang]?.password}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="crmId"
                  placeholder={translations[lang]?.crmLeadContact}
                />
                <AdminInputNote component="p" name="crmId" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="contactId"
                  placeholder={translations[lang]?.crmLeadContact}
                />
                <AdminInputNote component="p" name="contactId" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="pupilId"
                  placeholder={translations[lang]?.platformId}
                />
                <AdminInputNote component="p" name="pupilId" />
              </Label>
              {!uni && (
                <SpeakingLabel>
                  {uniValue && uniValue.value && (
                    <LabelText>{translations[lang]?.university}</LabelText>
                  )}
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
                    placeholder={translations[lang]?.university}
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
                  {isUniEmpty && (
                    <ErrorNote>{translations[lang]?.universityRequired}</ErrorNote>
                  )}
                </SpeakingLabel>
              )}
              <SpeakingLabel>
                {groupValue && groupValue.value && (
                  <LabelText>{translations[lang]?.group}</LabelText>
                )}
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
                  placeholder={translations[lang]?.group}
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
                {isGroupEmpty && (
                  <ErrorNote>{translations[lang]?.groupRequired}</ErrorNote>
                )}
              </SpeakingLabel>
              <AdminFormBtn type="submit">
                {translations[lang]?.addUserButton}
              </AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>{translations[lang]?.userListCaption}</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>№</UserHeadCell>
                {!uni && (
                  <UserHeadCell>{translations[lang]?.crmLeadContact}</UserHeadCell>
                )}
                <UserHeadCell>{translations[lang]?.name}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.email}</UserHeadCell>
                {!uni && <UserHeadCell>{translations[lang]?.password}</UserHeadCell>}
                {!uni && <UserHeadCell>{translations[lang]?.university}</UserHeadCell>}
                <UserHeadCell style={{ whiteSpace: 'nowrap' }}>
                  {translations[lang]?.group}
                  <button
                    style={{
                      padding: '0',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      marginLeft: '4px',
                    }}
                    onClick={sortByGroup}
                  >
                    <ArrowDownIcon />
                  </button>
                </UserHeadCell>
                <UserHeadCell>{translations[lang]?.points}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.platformId}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.attendance}</UserHeadCell>
                {!uni && (
                  <UserHeadCell>{translations[lang]?.visitsWithTime}</UserHeadCell>
                )}
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserDBRow key={user._id}>
                  <UserCell>{index + 1}</UserCell>
                  {!uni && (
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
                  )}
                  <UserCell>{user.name}</UserCell>
                  <UserCell>{user.mail}</UserCell>
                  {!uni && <UserCell>{user.password}</UserCell>}
                  {!uni && <UserCell className="last-name">{user.university}</UserCell>}
                  <UserCell>{user.group ? user.group : '1'}</UserCell>
                  <UserCell>{user.points ? user.points : '0'}</UserCell>
                  <UserCell>{user.pupilId}</UserCell>
                  <UserCell
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleVisitedEdit(user._id)}
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
                  {!uni && (
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
                  )}

                  <UserCell>
                    <UserEditButton onClick={() => handleEdit(user._id)}>
                      Edit
                    </UserEditButton>
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
              uni={uni}
              lang={lang}
              userToEdit={userToEdit}
              updateUser={updateUser}
              closeEditForm={closeEditForm}
              uniOptions={!uni ? uniOptions : []}
              groupOptions={groupOptions}
            />
          </Backdrop>
        )}
        {isVisitedEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <UserVisitedEditForm
              lang={lang}
              userToEdit={userToEdit}
              updateUserVisits={updateUserVisits}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniUserAdminPanel;
