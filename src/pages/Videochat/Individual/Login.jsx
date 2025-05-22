import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import { LoginErrorNote, LoginFormText } from 'components/Stream/Stream.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useState } from 'react';
import axios from 'axios';

function Login({ logined }) {
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const teacherLogin = async (login, password) => {
    try {
      const response = await axios.post('/teachers/login', {
        login: login.toLowerCase().trim().trimStart(),
        password: password.trim().trimStart(),
      });

      localStorage.setItem('userName', response.data.teacher.name);
      localStorage.setItem('login', response.data.teacher.login);
      localStorage.setItem('token', response.data.token);

      logined(true);
    } catch (error) {
      console.error('Teacher login failed:', error);
      throw error;
    }
  };

  const userLogin = async (login, password) => {
    try {
      const response = await axios.post('/users/login', {
        mail: login.toLowerCase().trim().trimStart(),
        password: password.trim().trimStart(),
      });

      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('mail', response.data.user.mail);
      localStorage.setItem('token', response.data.token);

      logined(false);
    } catch (error) {
      console.error('User login failed:', error);
      throw error;
    }
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    try {
      await teacherLogin(values.login, values.password);
      resetForm();
    } catch {
      try {
        await userLogin(values.login, values.password);
        resetForm();
      } catch (error) {
        error.response.status === 401 && setIsUserInfoIncorrect(true);
        console.error(error);
      }
    }
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
            onBlur={() => setIsUserInfoIncorrect(false)}
          />
          <AdminInputNote component="p" name="login" type="text" />
        </Label>
        <Label>
          <AdminInput
            type="password"
            name="password"
            placeholder="Password"
            onBlur={() => setIsUserInfoIncorrect(false)}
          />
          <AdminInputNote component="p" name="password" />
        </Label>
        <AdminFormBtn type="submit">Увійти</AdminFormBtn>
        <LoginErrorNote style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}>
          Логін або пароль введено неправильно!
        </LoginErrorNote>
      </LoginForm>
    </Formik>
  );
}

export default Login;
