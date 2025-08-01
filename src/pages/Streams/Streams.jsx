import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { StreamNav } from 'components/Stream/StreamNav/StreamNav';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import {
  LoginErrorNote,
  LoginInput,
  LoginInputNote,
  LoginLogo,
  StreamAuthText,
  StreamAuthTextHello,
} from '../../components/Stream/Stream.styled';
import { AdminFormBtn, LoginForm } from './AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
axios.defaults.headers.common['X-Page-URL'] = window.location.href;

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Streams = () => {
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState({});
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);

  const room = location.pathname;

  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  const wbUserTrack = useCallback(
    async body => {
      try {
        if (!room.match(/sc$/) && body.id) {
          const wbUser = await axios.get('/webinarusers/', {
            params: { userId: body.id },
          });
          const visitDate = `${new Date().toLocaleDateString('uk-UA')}`;
          const visitTimeDate = `${new Date().toISOString()}`;
          const wbUserToSaveOrUpdate = {
            userId: body.id,
            name: body.name,
            mail: body.mail,
            crmId: body.crmId,
            contactId: body.contactId,
            lang: body.lang,
            knowledge: body.knowledge,
            course: body.course,
            package: body.package,
          };
          const existingUser = wbUser?.data;
          if (existingUser) {
            await axios.put(`/webinarusers/${existingUser._id}`, {
              ...wbUserToSaveOrUpdate,
              visited: existingUser.visited.includes(visitDate)
                ? existingUser.visited
                : existingUser.visited.length === 365
                ? existingUser.visited.shift() && [...existingUser.visited, visitDate]
                : [...existingUser.visited, visitDate],
              visitedTime: existingUser.visitedTime.includes(visitTimeDate)
                ? existingUser.visitedTime
                : existingUser.visitedTime.length === 365
                ? existingUser.visitedTime.shift() && [
                    ...existingUser.visitedTime,
                    visitTimeDate,
                  ]
                : [...existingUser.visitedTime, visitTimeDate],
            });
          } else {
            await axios.post(`/webinarusers/new`, {
              ...wbUserToSaveOrUpdate,
              visited: [visitDate],
              visitedTime: [visitTimeDate],
            });
          }
        }
      } catch (error) {
        console.error('WbUser Error');
        console.error(error);
      }
    },
    [room]
  );

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const initialLoginByNameValues = {
    name: '',
    userId: '',
    lang: '',
    knowledge: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup
      .string()
      .required('Вкажіть пошту, за якою ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required('Введіть пароль, який ви використовуєте для входу на нашу платформу!'),
  });

  const loginByNameSchema = yup.object().shape({
    name: yup.string().required("Необхідно ввести ім'я та прізвище!"),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      console.log(values);
      console.log(response);
      await wbUserTrack(response.data.user);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.user));
      setUser(user => (user = response.data.user));
      localStorage.setItem('userID', nanoid(8));
      localStorage.setItem('mail', values.mail);
      localStorage.setItem('userName', response.data.user.name);
      setIsUserInfoIncorrect(false);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  const handleLoginByNameSubmit = async (values, { resetForm }) => {
    values.name = values.name.trim().trimStart();
    values.userId = nanoid(8);
    values.lang = room.includes('deutsch') ? 'de' : room.includes('polski') ? 'pl' : 'en';
    values.knowledge = room.includes('a2') ? 'a2' : 'a1';
    console.log(values);
    try {
      const response = await axios.post('/trialUsers/login', values);
      console.log(values);
      console.log(response);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.user));
      localStorage.setItem('userID', values.userId);
      localStorage.setItem('userName', response.data.user.name);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();

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
          'https://ap-server-8qi1.onrender.com/users/refresh',
          { mail: localStorage.getItem('mail') }
        );
        await wbUserTrack(res.data.user);
        setUser(user => (user = res.data.user));
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

    const refreshTrialToken = async () => {
      console.log('token refresher');

      try {
        const res = await axios.post('/trialUsers/refresh', {
          name: localStorage.getItem('userName'),
          userId: localStorage.getItem('userID'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    room.includes('free') && refreshTrialToken();
  }, [room, wbUserTrack]);

  return (
    <>
      <StreamsBackgroundWrapper
        className={location.pathname.includes('pedagogium') && 'pedagogium'}
      >
        {!isUserLogged &&
        !location.pathname.includes('admin-panel') &&
        !location.pathname.includes('teamlead-panel') &&
        !location.pathname.includes('-chat') &&
        !location.pathname.includes('tcp') &&
        !location.pathname.includes('speaking-panel') &&
        !location.pathname.includes('free') &&
        !location.pathname.includes('lesson-results') ? (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <LoginLogo />
              <StreamAuthText>
                <StreamAuthTextHello>
                  {location.pathname.includes('polskia0_2') ? 'Hello' : 'Привіт!'}
                </StreamAuthTextHello>
                {location.pathname.includes('polskia0_2')
                  ? 'Our website is not available without authorization. Please enter your email and password.'
                  : 'Ця сторінка недоступна для неавторизованих користувачів. Але, якщо ви маєте доступ до нашої платформи, то й до цієї сторінки теж. Введіть дані, які ви використовуєте для входу на платформу.'}
              </StreamAuthText>
              <Label>
                <LoginInput
                  type="text"
                  name="mail"
                  placeholder="Login"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <LoginInputNote component="p" name="mail" type="email" />
              </Label>
              <Label>
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <LoginInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                {location.pathname.includes('polskia0_2') ? 'Log In' : 'Увійти'}
              </AdminFormBtn>
              <LoginErrorNote
                style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
              >
                {location.pathname.includes('polskia0_2')
                  ? 'Password or email is incorrect!'
                  : 'Логін або пароль введено неправильно!'}
              </LoginErrorNote>
            </LoginForm>
          </Formik>
        ) : !isUserLogged &&
          location.pathname.includes('free') &&
          !location.pathname.includes('-chat') ? (
          <Formik
            initialValues={initialLoginByNameValues}
            onSubmit={handleLoginByNameSubmit}
            validationSchema={loginByNameSchema}
          >
            <LoginForm>
              <LoginLogo />
              <StreamAuthText>
                <StreamAuthTextHello>
                  Вітаємо вас на сторінці пробних занять!
                </StreamAuthTextHello>
                Для отримання доступу, будь ласка, введіть своє ім'я та прізвище у
                відповідне поле та натисніть кнопку "Увійти".
                <StreamAuthTextHello>
                  Вітаємо вас на сторінці пробних занять!
                </StreamAuthTextHello>
                Для отримання доступу, будь ласка, введіть своє ім'я та прізвище у
                відповідне поле та натисніть кнопку "Увійти".
              </StreamAuthText>
              <Label>
                <LoginInput type="text" name="name" placeholder="Ім'я та прізвище*" />
                <LoginInputNote component="p" name="name" />
              </Label>
              <AdminFormBtn type="submit">Увійти</AdminFormBtn>
            </LoginForm>
          </Formik>
        ) : location.pathname === '/streams' || location.pathname === '/streams/' ? (
          <StreamNav />
        ) : (
          <Outlet context={[links, isLoading, currentUser, room, user]} />
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

export default Streams;
