import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  align-items: flex-start;
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
  width: 400px;

  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  position: sticky;
  top: 50%;

  transform: translateY(-50%);
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
`;

export const AdminInput = styled(Input)`
  padding: 8px 10px;
  font-size: 16px;
  height: 40px;
  -webkit-text-stroke: 0px;

  border: 2px solid var(--main-color);

  &.error {
    border-color: red;
  }
`;

export const AdminInputNote = styled(InputNote)`
  position: static;
  color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  bottom: -1.1em;
`;
