import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import { ReactComponent as FilterIcon } from '../../../img/svg/filter.svg';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 20px;
  display: flex;
  align-items: flex-start;

  gap: 30px;
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

export const UsersForm = styled(Form)`
  margin: 0 auto;

  position: sticky;
  top: 50%;

  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UsersEditForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
  height: 48px;
  padding: 0;
`;

export const AdminInput = styled(Input)`
  width: 240px;
  padding: 8px 10px;
  font-size: 16px;
  height: 40px;
  -webkit-text-stroke: 0px;

  border: 2px solid var(--main-color);

  &.error {
    border-color: red;
  }

  @media screen and (min-width: 768px) {
    width: 360px;
  }
`;

export const AdminInputNote = styled(InputNote)`
  color: var(--main-color);
  font-size: 12px;
  font-weight: 500;
  position: static;
  max-width: 240px;

  @media screen and (min-width: 768px) {
    max-width: 360px;
  }
`;

export const UserDBTable = styled.table`
  max-width: 50vw;
  min-height: 80vh;
  margin: 0 auto;

  table-layout: auto;
  width: 100%;

  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;
`;

export const UserDBCaption = styled.caption`
  caption-side: top;
  margin-bottom: 20px;
`;

export const UserDBItemValue = styled.span`
  font-size: 11px;
`;

export const UserDBRow = styled.tr`
  border: 1px solid #000;
`;

export const UserHeadCell = styled.th`
  border: 1px solid #000;
  padding: 3px;
`;

export const Filterable = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  position: relative;
`;

export const UserCell = styled.td`
  border: 1px solid #000;
  padding: 3px;

  &.last-name {
    text-transform: capitalize;
  }

  &.attention {
    color: red;
  }

  &.error {
    background-color: #ff0000;
  }
`;

export const UserEditButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
`;

export const UserDeleteButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const UserBanButton = styled(UserDeleteButton)`
  &.banned {
    border-color: #023020;
  }
  &.not_banned {
    border-color: #8b0000;
  }
`;

export const FilterButton = styled(FilterIcon)`
  width: 18px;
  height: 12px;

  color: #000;

  transition: color var(--animation-global);

  &:hover {
    color: var(--main-color);
  }
`;

export const FilterPicker = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
`;

export const FilterPickerButton = styled.button`
  width: 100%;
  text-transform: capitalize;
`;
