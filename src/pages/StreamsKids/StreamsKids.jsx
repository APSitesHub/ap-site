import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { StreamNavKids } from 'components/Stream/StreamNavKids/StreamNavKids';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import {
  LoginInput,
  LoginInputNote,
  LoginLogo,
  StreamAuthText,
  StreamAuthTextHello,
} from '../../components/Stream/Stream.styled';
import {
  AdminFormBtn,
  LoginForm,
} from '../Streams/AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const StreamsKids = () => {
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);

  const room = location.pathname;

  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  const detectUser = async () => {
    try {
      let ip;
      try {
        ip = (await axios.get('https://jsonip.com/')).data.ip;
        console.log(ip);
      } catch (error) {
        console.log(error);
      }
      const id = localStorage.getItem('userID');
      const user = await axios.get(`https://ap-chat.onrender.com/users/${id}`);
      setCurrentUser(
        currentUser =>
          (currentUser = user.data || {
            username: 'User Is Not Logged In',
            isBanned: false,
            userIP: ip || 'user has disabled ip tracker',
          })
      );
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
      console.log(values);
      console.log(response);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.user));
      localStorage.setItem('userID', nanoid(8));
      localStorage.setItem('mail', values.mail);
      localStorage.setItem('userName', response.data.user.name);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();
    detectUser();

    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setLinks((await axios.get('/links')).data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLinksRequest();

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post(
          'https://aggregator-server.onrender.com/users/refresh',
          { mail: localStorage.getItem('mail') }
        );
        setIsUserLogged(isLogged => (isLogged = true));
        const id = nanoid(8);
        if (!localStorage.getItem('userID')) {
          localStorage.setItem('userID', id);
        }
        localStorage.setItem('userName', res.data.user.name);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  return (
    <>
      <StreamsBackgroundWrapper>
        {!isUserLogged && !location.pathname.includes('-chat') ? (
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
        ) : location.pathname === '/streams-kids' ||
          location.pathname === '/streams-kids/' ? (
          <StreamNavKids />
        ) : (
          <Outlet
            context={[links, isLoading, currentUser, room]}
          />
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

export default StreamsKids;
