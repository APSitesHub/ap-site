import { FormBtn } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import { AdminInputNote } from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

export const UserSpeakingEditForm = styled(Form)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 20px);
  max-width: 400px;

  background-color: white;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  & .react-datepicker__tab-loop {
    margin-top: -6px;
  }

  & .react-datepicker-popper {
    z-index: 2;
  }

  @media screen and (min-height: 960px) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);

    padding: 16px 24px;
    border-radius: 24px;

    gap: 9px;
  }

  @media screen and (min-height: 960px) {
    & .react-datepicker__tab-loop {
      margin-top: -9px;
    }
  }
`;

export const SpeakingLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;

  &:first-child {
    padding-top: 4px;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  max-height: 38px;
  padding: 10px;
  border: 2px solid var(--main-color);

  @media screen and (min-width: 960px) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }
`;

export const LabelText = styled.span`
  position: absolute;
  top: -5.5px;
  left: 10px;
  z-index: 1;
  background-color: white;

  font-size: 10px;
  display: block;
  padding: 1px;

  @media screen and (min-height: 960px) {
    top: -8px;
    font-size: 12px;
    padding: 2px;
  }
`;

export const LabelDatePickerText = styled(LabelText)`
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 1;
  background-color: white;

  font-size: 10px;
  display: block;
  padding: 1px;

  @media screen and (min-height: 960px) {
    top: 1px;
    padding: 2px;
    font-size: 12px;
  }
`;

export const SpeakingSelect = styled(FormSelect)`
  font-size: 16px;
`;

export const SpeakingFormBtn = styled(FormBtn)`
  margin: 0 auto;
  padding: 12px;
  height: auto;

  @media screen and (min-width: 768px) {
    padding: 16px;
    letter-spacing: 0.6px;
  }
`;

export const StudentTextAreaNote = styled(AdminInputNote)`
  color: red;
`;
