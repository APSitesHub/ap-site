import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainPage,
  LoginForm,
  InputContainer,
  InputField,
  LoginButton,
} from './TeacherLogin.styled';

const TeacherLogin = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    const values = {
      login: loginRef.current.value.toLowerCase().trim().trimStart(),
      password: passwordRef.current.value.trim().trimStart(),
    };
    event.preventDefault();

    try {
      const response = await axios.post('/teachers/login', values);

      localStorage.setItem('login', response.data.teacher.login);
      localStorage.setItem('token', response.data.token);
      navigate('../videochat');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainPage>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputContainer>
          <label htmlFor="login">Login:</label>
          <InputField type="text" id="login" ref={loginRef} required />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password:</label>
          <InputField
            type="password"
            id="password"
            ref={passwordRef}
            required
          />
        </InputContainer>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </MainPage>
  );
};

export default TeacherLogin;
