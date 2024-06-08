import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

export const LinksForm = styled(Form)`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
`;

export const AdminInput = styled(Input)`
  border: 2px solid var(--main-color);
`;

export const AdminTextArea = styled(Input)`
  border-radius: 0;
  width: 35vw;
  height: 75vh;
  scrollbar-width: thin;
  background-color: transparent;
`;

export const AdminInputNote = styled(InputNote)`
  position: static;
  color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  bottom: -1.1em;
`;

export const LessonInfo = styled.ul`
  display: flex;
  gap: 14px;

  text-transform: capitalize;
  font-weight: 600;
`;
