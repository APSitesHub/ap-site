import styled from 'styled-components';
import { UserDBCaption, UserDBTable } from '../UserAdminPanel/UserAdminPanel.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';

export const AppointmentDBTable = styled(UserDBTable)`
  max-width: 90vw;
  margin: 0 auto;

  table-layout: auto;
  width: 100%;

  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;

  position: relative;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 6px;
`;

export const AppointmentCaption = styled(UserDBCaption)`
  position: sticky;
  top: 0;
  z-index: 1;

  background: linear-gradient(#ffffff 75%, #ffffff80);
  padding: 12px;
  padding-bottom: 36px;
`;

export const CheckboxLabel = styled(Label)`
  flex-direction: row;
  margin-left: auto;
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
`;

export const AppointmentCell = styled.td`
  border: 1px solid #000;
  padding: 3px;
  height: 3em;
`;

export const AppointmentBody = styled.p`
  padding: 6px;
  display: flex;
  align-items: center;
  flex-basis: 100%;
  background-color: aliceblue;
  border-radius: 6px;
  gap: 1.5em;
  margin: 0.5em;
  font-weight: 700;
  color: #000000b7;
  position: relative;

  background-color: ${props => {
    switch (props.dataStatus) {
      case '0':
        return '#bcb73140';
      case '1':
        return '#31bc6b40';
      case '-1':
        return '#bc313140';
      default:
        return '#bcb73140';
    }
  }};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0.5%;
    transform: translateY(-50%);
    width: 99%;
    height: 1px;
    background-color: #000;
    display: ${props => (props.deleted ? 'block' : 'none')};
  }
`;

export const AppointmentSpan = styled.span`
  text-align: start;
  width: ${props => props.componentWidth || 'auto'};
`;
