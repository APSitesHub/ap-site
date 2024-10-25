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

const SpeakingsRatings = () => {
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
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.login = values.login.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/teachers/login', values);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.teacher));
      localStorage.setItem('teacherLogin', values.login);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();

    const refreshToken = async () => {
      console.log('token refresher');
      if (localStorage.getItem('teacherLogin')) {
        try {
          setIsLoading(true);
          const res = await axios.post('/teachers/refresh', {
            login: localStorage.getItem('teacherLogin'),
          });

          setAuthToken(res.data.token);
          setCurrentUser(currentUser => (currentUser = res.data.teacher));
          setIsUserLogged(isLogged => (isLogged = true));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
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
                Це сторінка для викладачів. <br />
                Якщо ви викладач, введіть ваші логін та пароль.
              </StreamAuthText>
              <Label>
                <LoginInput type="text" name="login" placeholder="Login" />
                <LoginInputNote component="p" name="login" />
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
          <Outlet context={[currentUser]} />
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

export default SpeakingsRatings;
