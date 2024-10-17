import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { Formik } from 'formik';
import { useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import * as yup from 'yup';
import {
  LoginInput,
  LoginInputNote,
  LoginLogo,
  StreamAuthText,
  StreamAuthTextHello,
} from '../../components/Stream/Stream.styled';
import { AdminFormBtn, LoginForm } from './AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Speakings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);

  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup
      .string()
      .required('Вкажіть пошту, за якою ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required(
        'Введіть пароль, який ви використовуєте для входу на нашу платформу!'
      ),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.user));
      localStorage.setItem('teacherMail', values.mail);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        setIsLoading(true);
        const res = await axios.post(
          'https://ap-server-8qi1.onrender.com/users/refresh',
          { mail: localStorage.getItem('mail') }
        );
        setIsUserLogged(isLogged => (isLogged = true));

        localStorage.setItem('teacherName', res.data.user.name);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    refreshToken();
  }, []);

  return (
    <>
      <StreamsBackgroundWrapper>
        {!isUserLogged ? (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <LoginLogo />
              <StreamAuthText>
                <StreamAuthTextHello>Привіт!</StreamAuthTextHello>
                Ця сторінка недоступна для неавторизованих користувачів. Але,
                якщо ви маєте доступ до нашої платформи, то й до цієї сторінки
                теж. Введіть дані, які ви використовуєте для входу на платформу.
              </StreamAuthText>
              <Label>
                <LoginInput type="text" name="mail" placeholder="Login" />
                <LoginInputNote component="p" name="mail" type="email" />
              </Label>
              <Label>
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <LoginInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Увійти</AdminFormBtn>
            </LoginForm>
          </Formik>
        ) : (
          <Outlet context={[isLoading, currentUser]} />
        )}

        {isLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </StreamsBackgroundWrapper>
    </>
  );
};

export default Speakings;
