import { LargeText } from 'pages/Videochat/Videochat.styled';
import styled from 'styled-components';

export const ReminderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ReminderText = styled(LargeText)`
  font-size: 2.5em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
