import styled from 'styled-components';

export const MainPage = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled.form`
  width: 364px;
  padding: 24px;
  border: 1px solid gray;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
`;

export const LoginButton = styled.button`
  padding: 12px 16px;
  background-color: #0f645b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;