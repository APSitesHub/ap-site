import {
  FormBtn,
  Input,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import {
  ClipBoardFormDismissBtn,
  ClipBoardFormText,
  ClipBoardSubmitBtn,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { Form } from 'formik';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  gap: 35px;
`;

export const KahootLvlBtnBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 15px;
  margin: 0 auto;
`;

export const KahootLvlBtn = styled.button`
  font-size: 22px;
  font-weight: 600;
  background-color: #fff;
  border: 1.5px solid;
  border-radius: 10px;

  transition: background-color var(--animation-global);

  &:hover,
  &:focus {
    background-color: var(--accent-color);
  }
`;

export const KahootFormBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;

  background-color: #ffffffd9;
  padding: 1px 20px;
  border-radius: 20px;
`;

export const LinksForm = styled(Form)`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 35px;

  max-width: 500px;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
`;

export const AdminInput = styled(Input)`
  border: 2px solid var(--main-color);
`;

export const LabelCheckBox = styled(Label)`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AdminCheckbox = styled(Input)`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

export const AdminInputNote = styled(InputNote)`
  color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  bottom: -1.1em;
`;

export const WarningBox = styled.div`
  font-family: var(--streams-font-family);
`;

export const WarningDismissBtn = styled(ClipBoardFormDismissBtn)``;

export const WarningText = styled(ClipBoardFormText)`
  margin-bottom: 16px;
`;

export const WarningBtnBox = styled.div`
  display: flex;
  gap: 15px;
`;

export const WarningBtn = styled(ClipBoardSubmitBtn)`
  background-color: transparent;
  border: solid var(--main-color) 1.5px;
  border-radius: 25px;

  &.delete:hover,
  &.delete:focus {
    background-color: #ff000030;
  }

  &.cancel:hover,
  &.cancel:focus {
    background-color: #00800030;
  }
`;

export const FormTitle = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
`;
