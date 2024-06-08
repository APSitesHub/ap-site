import { DescriptionTrigger } from 'components/Hero/Hero.styled';
import styled from 'styled-components';

export const ScheduleTrigger = styled(DescriptionTrigger)`
  margin: 0 auto;
  font-size: 22px;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 26px;
  }
`;

export const ScheduleTable = styled.div``;
