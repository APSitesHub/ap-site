import { useEffect, useState } from 'react';
import TeacherAPPanel from './TeacherAPPanel/TeacherAPPanel';
import axios from 'axios';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import {
  LoginErrorNote,
  LoginFormText,
  StreamSection,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import * as yup from 'yup';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

const TeacherAP = () => {
  const [isTeacherLogged, setIsTeacherLogged] = useState(false);
  const [isTeacherInfoIncorrect, setIsTeacherInfoIncorrect] = useState(false);
  const [iframeLink, setIframeLink] = useState('');

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post('/teachers/refresh', {
          login: localStorage.getItem('login'),
        });
        localStorage.setItem('token', res.data.newToken);
        setIsTeacherLogged(isLogged => (isLogged = true));
        localStorage.setItem('userName', res.data.teacher.name);
        setPlatformLink(res.data.teacher.platformToken);
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.login = values.login.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/teachers/login', values);
      setAuthToken(response.data.token);
      setIsTeacherLogged(isLogged => (isLogged = true));
      localStorage.setItem('userName', response.data.teacher.name);
      localStorage.setItem('login', values.login);
      localStorage.setItem('token', response.data.token);
      setIsTeacherInfoIncorrect(false);
      setPlatformLink(response.data.teacher.platformToken);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsTeacherInfoIncorrect(true);
      console.error(error);
    }
  };

  const setPlatformLink = token => {
    setIframeLink(
      `https://online.ap.education/LoginByToken?token=${token}&redirectUrl=${encodeURIComponent(
        `https://https://online.ap.education/cabinet/school/marathons/list`
      )}`
    );
  };

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup
      .string()
      .required('Вкажіть логін, за яким ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required('Введіть пароль, який ви використовуєте для входу на нашу платформу!'),
  });

  return (
    <StreamSection>
      {!isTeacherLogged ? (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Привіт!
              <br />
              Ця сторінка недоступна для неавторизованих користувачів. Але якщо ви маєте
              доступ до нашої платформи, то й до цієї сторінки теж. Введіть дані, які ви
              використовуєте для входу на платформу.
            </LoginFormText>
            <Label>
              <AdminInput
                type="text"
                name="login"
                placeholder="Login"
                onBlur={() => setIsTeacherInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="login" type="text" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => setIsTeacherInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
            <LoginErrorNote
              style={isTeacherInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              Логін або пароль введено неправильно!
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      ) : (
        <>
          <iframe
            id="platform-window"
            title="platform-pin"
            src={iframeLink}
            width="100%"
            height="100%"
            allow="microphone *"
          ></iframe>
          <TeacherAPPanel />
        </>
      )}
    </StreamSection>
  );
};

export default TeacherAP;
