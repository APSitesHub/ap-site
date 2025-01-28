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
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    const values = {
      mail: emailRef.current.value.toLowerCase().trim().trimStart(),
      password: passwordRef.current.value.trim().trimStart(),
    };
    event.preventDefault();

    try {
      const response = await axios.post('/users/login', values);
      console.log(response);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('mail', response.data.user.mail);
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
          <label htmlFor="email">Email:</label>
          <InputField type="text" id="email" ref={emailRef} required />
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
