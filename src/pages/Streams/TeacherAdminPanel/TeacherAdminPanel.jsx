import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
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
} from './TeacherAdminPanel.styled';
import { TeacherEditForm } from './TeacherEditForm/TeacherEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UserAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState({});
  const [isTimeToUpdate, setIsTimeToUpdate] = useState(false);

  useEffect(() => {
    document.title = 'Teacher Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/teachers/', {});
          setAuthToken(res.data.newToken);
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getTeachers = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/teachers/');
          setTeachers(teachers => (teachers = [...response.data.reverse()]));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTeachers();

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isEditFormOpen) {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isEditFormOpen, isTimeToUpdate]);

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
      const response = await axios.post('/admins/login/teachers', values);
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

  const initialTeacherValues = {
    name: '',
    login: '',
    password: '',
  };

  const teachersSchema = yup.object().shape({
    name: yup.string().required("Ім'я - обов'язкове поле"),
    login: yup.string().required("Логін - обов'язкове поле!"),
    password: yup.string().required("Пароль - обов'язкове поле!"),
  });

  const handleTeacherSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.login = values.login.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/teachers/new', values);
      console.log(response);
      resetForm();
      alert('Юзера додано');
      setIsTimeToUpdate(isTime => !isTime);
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
    setTeacherToEdit(
      teacherToEdit =>
        (teacherToEdit = teachers.find(teacher => teacher._id === id))
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

  const handleDelete = async id => {
    setIsLoading(isLoading => (isLoading = true));
    const areYouSure = window.confirm(
      `Точно видалити ${teachers.find(teacher => teacher._id === id).name}?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.delete(`/teachers/${id}`);
        console.log(response);
        alert('Тічера видалено');
        setTeachers(
          teachers =>
            (teachers = [...teachers.filter(teacher => teacher._id !== id)])
        );
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

        {isUserAdmin && (
          <Formik
            initialValues={initialTeacherValues}
            onSubmit={handleTeacherSubmit}
            validationSchema={teachersSchema}
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
                <AdminInput type="text" name="login" placeholder="Логін" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput type="text" name="password" placeholder="Пароль" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Додати тічера</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        {isUserAdmin && teachers.length && (
          <UserDBTable>
            <UserDBCaption>
              Список акаунтів тічерів з доступом до табличок відгуків
            </UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Логін</UserHeadCell>
                <UserHeadCell>Пароль</UserHeadCell>
                <UserHeadCell>Відвідини</UserHeadCell>
                <UserHeadCell>Відвідини з часом</UserHeadCell>
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {teachers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(teacher => (
                  <UserDBRow key={teacher._id}>
                    <UserCell>{teacher.name}</UserCell>
                    <UserCell>{teacher.login}</UserCell>
                    <UserCell>{teacher.password}</UserCell>
                    <UserCell>
                      {teacher.visited[teacher.visited.length - 1]}
                    </UserCell>
                    <UserCell>
                      {teacher.visitedTime.length
                        ? new Date(
                            changeDateFormat(
                              teacher.visitedTime[
                                teacher.visitedTime.length - 1
                              ]
                            )
                          ).toLocaleString('uk-UA', { timeZone: '+03:00' })
                        : ''}
                    </UserCell>
                    <UserCell>
                      {teacher.name === 'Dev Acc' ? null : (
                        <UserEditButton onClick={() => handleEdit(teacher._id)}>
                          Edit
                        </UserEditButton>
                      )}
                    </UserCell>
                    <UserCell>
                      {teacher.name === 'Dev Acc' ? null : (
                        <UserDeleteButton
                          onClick={() => handleDelete(teacher._id)}
                        >
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
            <TeacherEditForm
              teacherToEdit={teacherToEdit}
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
