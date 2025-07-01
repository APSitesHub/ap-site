import styled from 'styled-components';
import { Form } from 'formik';
import DatePicker from 'react-datepicker';
import { FormBtn } from 'components/LeadForm/LeadForm.styled';
import { FormSelect } from '../TimeTableAdminPanel/TimeTableAdminPanel.styled';

export const PointsAdminContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  gap: 40px;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

export const PointsAdminSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 360px;
  padding: 1rem;
  height: 100%;
  border-right: 1px solid lightgray;
`;

export const PointsAdminTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  margin: 0 12px;
`;

export const LessonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 12px 0;
`;

export const PointsForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  max-height: 38px;
  padding: 10px;
  border: 2px solid var(--main-color);

  @media screen and (min-width: 960px) {
    font-size: 16px;
  }

  &.error {
    border: 4px solid red;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }
`;

export const AdminDatePicker = styled(StyledDatePicker)`
  border-radius: 50px;
  min-height: 42px;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 19px;
  }
`;

export const SubmitFormBtn = styled(FormBtn)`
  margin: 0 auto;
  height: 48px;
  padding: 0;
`;

export const LessonItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 16px;
  background-color: #d5f7f8;
  width: 100%;
  font-size: 14px;
  transition: background-color var(--animation-global);

  &:hover {
    background-color: #adf0d0;
  }

  @media screen and (min-width: 768px) {
    font-size: 19px;
    font-weight: 700;
  }
`;

export const SmallText = styled.p`
  font-size: 12px;
  color: #666;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

export const PointsFormSelect = styled(FormSelect)`
  border-radius: 50px;
`;