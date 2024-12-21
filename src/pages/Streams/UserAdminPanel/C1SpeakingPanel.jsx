import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TeacherTable } from '../TeacherAdminPanel/TeacherAdminPanel.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
} from './UserAdminPanel.styled';
import { UserEditForm } from './UserEditForm/UserEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const C1SpeakingPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

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
          const response = await axios.get('/users/a-c1');
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
        const response = await axios.delete(`/users/${id}`);
        console.log(response);
        alert('Юзера видалено');
        setUsers(users => (users = [...users.filter(user => user._id !== id)]));
      } catch (error) {
        console.error(error);
        alert(
          'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
        );
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

        {isUserAdmin && users && (
          <TeacherTable>
            <UserDBCaption>
              Юзери з додатково придбаними спікінгами
            </UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>CRM&nbsp;Лід Контакт</UserHeadCell>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Пошта (логін)</UserHeadCell>
                <UserHeadCell>Пароль</UserHeadCell>
                <UserHeadCell>ID на платформі</UserHeadCell>
                <UserHeadCell>Номер марафону</UserHeadCell>
                <UserHeadCell>Відвідини після 05.11</UserHeadCell>
                <UserHeadCell>Візитів після 05.11</UserHeadCell>
                <UserHeadCell>Мова</UserHeadCell>
                <UserHeadCell>Потік</UserHeadCell>
                <UserHeadCell>Знання</UserHeadCell>
                <UserHeadCell>Пакет послуг</UserHeadCell>
                <UserHeadCell>Менеджер</UserHeadCell>
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
                  <UserCell>{user.pupilId}</UserCell>
                  <UserCell>{user.marathonNumber}</UserCell>
                  <UserCell
                    style={
                      user.visited.filter(
                        visit =>
                          changeDateFormat(visit) >=
                          changeDateFormat('05.11.2024')
                      ).length >= parseInt(user.package)
                        ? {
                            fontWeight: 700,
                            color: 'red',
                          }
                        : undefined
                    }
                  >
                    {user.visited
                      .filter(
                        visit =>
                          changeDateFormat(visit) >=
                          changeDateFormat('05.11.2024')
                      )
                      .map(visit => (
                        <p>{visit}</p>
                      ))}
                  </UserCell>

                  <UserCell
                    style={
                      user.visited.filter(
                        visit =>
                          changeDateFormat(visit) >=
                          changeDateFormat('05.11.2024')
                      ).length >= parseInt(user.package)
                        ? {
                            fontWeight: 700,
                            color: 'red',
                          }
                        : undefined
                    }
                  >
                    {
                      user.visited.filter(
                        visit =>
                          changeDateFormat(visit) >=
                          changeDateFormat('05.11.2024')
                      ).length
                    }
                  </UserCell>
                  <UserCell>{user.lang}</UserCell>
                  <UserCell>{user.course}</UserCell>
                  <UserCell
                    className={user.knowledge?.includes('а') && 'error'}
                  >
                    {user.knowledge}
                  </UserCell>
                  <UserCell
                    style={
                      user.visited.filter(
                        visit =>
                          changeDateFormat(visit) >=
                          changeDateFormat('05.11.2024')
                      ).length >= parseInt(user.package)
                        ? {
                            fontWeight: 700,
                            color: 'red',
                          }
                        : undefined
                    }
                  >
                    {user.package}
                  </UserCell>
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
              ))}
            </tbody>
          </TeacherTable>
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

export default C1SpeakingPanel;
