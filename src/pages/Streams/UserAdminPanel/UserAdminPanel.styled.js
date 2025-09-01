import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Form } from 'formik';
import { ReactComponent as FilterIcon } from '../../../img/svg/filter.svg';
import { ReactComponent as _ArrowDownIcon } from '../../../img/svg/invertedDownArrow.svg';
import styled from 'styled-components';

export const AdminPanelSection = styled.section`
  height: max-content;
  min-height: 100vh;
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

export const UsersDBForm = styled(Form)`
  margin: 0 auto;
  padding-top: 20px;

  position: sticky;
  top: 0%;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const UsersEditForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DatesEditBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;

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
  position: relative;

  &::before {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 2;
    content: ${props =>
      props.filterValue ? JSON.stringify('💡' + props.filterValue) : null};
    text-transform: capitalize;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);

    color: var(--main-color);
  }
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
  height: 3em;

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

export const UserCellLeft = styled(UserCell)`
  text-align: start;
  padding-left: 8px;
  max-width: 50vw;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const UserEditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
`;

export const UserChartButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const UserDeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #d40000;
  border-radius: 5px;
`;

export const UserBanButton = styled(UserDeleteButton)`
  &.banned {
    border-color: #023020;
  }
  &.not_banned {
    border-color: #d40000;
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

export const ArrowDownIcon = styled(_ArrowDownIcon)`
  width: 12px;
  height: 12px;
  cursor: pointer;

  color: #000;

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

export const SliceUsersButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
`;

export const SliceUsersButton = styled.button`
  width: 60px;
  height: 24px;

  padding: 2px;
  font-size: 16px;
  font-weight: 700;

  text-transform: uppercase;
  color: var(--secondary-color);
  border-radius: 5px;
  border: none;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;

  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;

  outline: transparent;

  position: relative;

  &.active {
    border: var(--accent-color) solid 2px;
  }

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;

    background: linear-gradient(322deg, #09c6cc 23.22%, #0f645b 110.01%), #09c6cc;

    transition: opacity var(--animation-global);
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const SliceUsersButtonText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;
`;
