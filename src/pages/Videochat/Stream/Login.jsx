import { Formik } from 'formik';
import * as yup from 'yup';
import { Label } from 'components/LeadForm/LeadForm.styled';
import {
  LoginErrorNote,
  LoginFormText,
  LoginInput,
  LoginInputNote,
} from 'components/Stream/Stream.styled';
import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { GradientBackground, LoginForm, LoginPage } from '../Videochat.styled';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login({ logined }) {
  const { id: roomID } = useParams();
  const lang = roomID === '446390d3-10c9-47f4-8880-8d9043219ccd' ? 'pl' : 'ua';

  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      .required('Введіть пароль, який ви використовуєте для входу на нашу платформу!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      setAuthToken(response.data.token);
      localStorage.setItem('mail', values.mail);
      localStorage.setItem('userName', response.data.user.name);
      setIsUserInfoIncorrect(false);
      logined();
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  return (
    <GradientBackground>
      <LoginPage>
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LoginFormText style={{ color: 'white' }}>
              {lang === 'pl' ? (
                <>
                  Hello!
                  <br />
                  Our website is not available without authorization. Please enter your
                  email and password.
                </>
              ) : (
                <>
                  Привіт!
                  <br />
                  Ця сторінка недоступна для неавторизованих користувачів. Але, якщо ви
                  маєте доступ до нашої платформи, то й до цієї сторінки теж. Введіть
                  дані, які ви використовуєте для входу на платформу.
                </>
              )}
            </LoginFormText>
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
              {lang === 'pl' ? 'Zalogować się' : 'Увійти'}
            </AdminFormBtn>
            <LoginErrorNote
              style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              {lang === 'pl'
                ? 'Password or email is incorrect!'
                : 'Логін або пароль введено неправильно!'}
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      </LoginPage>
    </GradientBackground>
  );
}

export default Login;
