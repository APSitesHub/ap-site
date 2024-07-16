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

export const ScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;

  text-transform: capitalize;
  font-weight: 600;
`;

export const ScheduleItem = styled.li`
  width: max-content;
`;

export const ScheduleInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ScheduleData = styled.li`
  font-size: 14px;
  font-weight: 400;
`;

export const ScheduleParagraph = styled.p`
display: flex;
flex-direction: row;
  gap: 20px;
`;