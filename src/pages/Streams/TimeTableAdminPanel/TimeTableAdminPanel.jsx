import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
  UsersForm,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  ScheduleData,
  ScheduleInfo,
  ScheduleItem,
  ScheduleList,
} from './TimeTableAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const TimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    document.title = 'Timetable Admin Panel | AP Education';

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

    const getLessons = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/timetable/');
          console.log(response);
          setLessons(lessons => (lessons = [...response.data]));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();

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

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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

  const initialLessonValues = {
    marathonId: '',
    lessonId: '',
    marathonName: '',
    lang: '',
    level: '',
    lesson: '',
    topic: '',
    keysEn: '',
    keysUa: '',
    pdf: '',
    video: '',
  };

  const lessonSchema = yup.object().shape({
    marathonId: yup
      .string()
      .required(
        "marathonId - обов'язкове поле! Значення дивись на платформі в адресному рядку"
      )
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри'),
    lessonId: yup
      .string()
      .required(
        "marathonLessonId - обов'язкове поле! Значення дивись на платформі в адресному рядку"
      )
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри'),
    marathonName: yup
      .string()
      .required("Назва і номер марафону - обов'язкове поле!"),
    lang: yup
      .string()
      .required("Мова - обов'язкове поле!")
      .matches(/^[A-Za-z]+$/, 'Лише латинські літери'),
    level: yup
      .string()
      .required("Рівень - обов'язкове поле!")
      .matches(/^[A-Za-z0-9-]+$/, 'Лише латинські літери та цифри'),
    lesson: yup.string().required("Урок - обов'язкове поле!"),
    topic: yup
      .string()
      .required(
        "Тема уроку - обов'язкове поле! Введи теми як граматики, так і словника одним рядком"
      ),
    keysEn: yup
      .string()
      .required(
        "Ключі англійською - обов'язкове поле! Введи переклад тему уроку або її фрагментів англійською"
      ),
    keysUa: yup
      .string()
      .required(
        "Ключі українською - обов'язкове поле! Введи переклад тему уроку або її фрагментів українською"
      ),
    pdf: yup.string() || yup.array().of(yup.string()),
    video: yup.string() || yup.array().of(yup.string()),
  });

  const handleLessonSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    values.pdf =
      values.pdf === ''
        ? []
        : [...values.pdf.split(',').map(link => link.trim().trimStart())];
    values.video =
      values.video === ''
        ? []
        : [...values.video.split(',').map(link => link.trim().trimStart())];
    try {
      const response = await axios.post('/lessons', values);
      console.log(response);
      resetForm();
      alert('Урок додано');
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
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
            initialValues={initialLessonValues}
            onSubmit={handleLessonSubmit}
            validationSchema={lessonSchema}
          >
            <UsersForm>
              <Label>
                <AdminInput
                  type="text"
                  name="marathonId"
                  placeholder="marathonId"
                />
                <AdminInputNote component="p" name="marathonId" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="lessonId"
                  placeholder="marathonLessonId"
                />
                <AdminInputNote component="p" name="lessonId" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="marathonName"
                  placeholder="Назва і номер марафону"
                />
                <AdminInputNote component="p" name="marathonName" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="lang"
                  placeholder="Мова (en/de/pl)"
                />
                <AdminInputNote component="p" name="lang" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="level"
                  placeholder="Рівень (A1/A2/B1/B2)"
                />
                <AdminInputNote component="p" name="level" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="lesson"
                  placeholder="Номер уроку (Lesson 12)"
                />
                <AdminInputNote component="p" name="lesson" />
              </Label>
              <Label>
                <AdminInput type="text" name="topic" placeholder="Тема уроку" />
                <AdminInputNote component="p" name="topic" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="keysUa"
                  placeholder="Ключові слова українською"
                />
                <AdminInputNote component="p" name="keysUa" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="keysEn"
                  placeholder="Ключові слова англійською"
                />
                <AdminInputNote component="p" name="keysEn" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="video"
                  placeholder="Внести посилання на відео через кому"
                />
                <AdminInputNote component="p" name="knowledge" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="pdf"
                  placeholder="Внести посилання на таблиці через кому"
                />
                <AdminInputNote component="p" name="pdf" />
              </Label>
              <AdminFormBtn type="submit">Додати урок</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        <ScheduleList>
          {lessons &&
            lessons.map(timetable => (
              <ScheduleItem key={timetable._id}>
                <h1>
                  {timetable.lang} {timetable.level}
                </h1>
                <ScheduleInfo>
                  {timetable.schedule.map(schedule => (
                    <ScheduleData>
                      {DAYS[schedule.day - 1]}
                      {schedule.type}
                      {schedule.time}
                    </ScheduleData>
                  ))}
                </ScheduleInfo>
              </ScheduleItem>
            ))}
        </ScheduleList>
      </AdminPanelSection>
    </>
  );
};
