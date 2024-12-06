import axios from 'axios';
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
  Feedback,
  LoginForm,
  TeacherTable,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserHeadCell,
} from './TeacherAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const TeacherControlPageDe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    document.title = 'Teacher Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/teachers/', {});
          setAuthToken(res.data.newToken);
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    refreshToken();

    const getTeachers = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (isUserAdmin) {
          const response = await axios.get('/teachers/de');
          setTeachers(teachers => (teachers = [...response.data.reverse()]));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getTeachers();

    const getReviews = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (isUserAdmin) {
          const response = await axios.get('/speakingusers/admin/de');
          setReviews(reviews => (reviews = [...response.data]));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getReviews();
  }, [isUserAdmin]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const regex = /\d{1,}\.\d{2}\.\d{4}/;

  // const changeDateFormat = dateString => {
  //   if (dateString) {
  //     const dateArray = dateString.split('.');
  //     return dateArray.length > 2
  //       ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
  //       : Date.parse(dateString);
  //   }
  //   return;
  // };

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

        {isUserAdmin && teachers.length && (
          <TeacherTable>
            <UserDBCaption>
              Список акаунтів тічерів з доступом до табличок відгуків
            </UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>Тічер</UserHeadCell>
                <UserHeadCell>Відгуки</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {teachers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((teacher, i) => (
                  <UserDBRow>
                    <UserCell key={'Тічер' + teacher._id}>
                      {teacher.name}
                    </UserCell>
                    <UserCell key={`Відгук ${i} ${teacher._id}`}>
                      {reviews
                        .filter(user =>
                          user.feedback.some(
                            review =>
                              review.includes(teacher.name) ||
                              review.includes(
                                teacher.name.split(' ').reverse().join(' ')
                              )
                          )
                        )
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(
                          user =>
                            (user = {
                              _id: user._id,
                              name: user.name,
                              feedback: user.feedback.filter(
                                text =>
                                  text.includes(teacher.name) ||
                                  text.includes(
                                    teacher.name.split(' ').reverse().join(' ')
                                  )
                              ),
                            })
                        )
                        .flatMap(user =>
                          user.feedback.map(
                            feedback => `для ${user.name}) ${feedback}`
                          )
                        )
                        .map(text => (
                          <Feedback>
                            {text.length > 200
                              ? `(Відгук від ${text.match(regex)} ${text.slice(0, 200)}...`
                              : `(Відгук від ${text.match(regex)} ${text}`}
                          </Feedback>
                        ))}
                    </UserCell>
                  </UserDBRow>
                ))}
            </tbody>
          </TeacherTable>
        )}

        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default TeacherControlPageDe;
