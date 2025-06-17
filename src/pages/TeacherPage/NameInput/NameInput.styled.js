import styled from 'styled-components';
import {
  TeacherButtonBox,
  TeacherButtonBoxHideSwitch,
} from 'pages/TeacherPage/TeacherPage.styled';

export const NameInputBtn = styled(TeacherButtonBoxHideSwitch)`
  top: 0;
  left: 50%;
  right: unset;
  bottom: unset;

  width: 90px;
  height: 18px;

  transform: translateX(-50%);
`;

export const NameInputBox = styled(TeacherButtonBox)`
  flex-direction: row;
  top: 0;
  left: 50%;
  right: unset;
  bottom: unset;
  background-color: black;
  transform: translate(-50%, 30px);

  z-index: 9;

  background-color: var(--secondary-color);
  padding: 10px;
  padding-top: 30px;
  padding-bottom: 6px;
  transform: translate(-50%, 0);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.18);

  &.hidden {
    transform: translate(-50%, -200px);
  }
`;

export const TeacherInfoInput = styled.input`
  color: var(--main-color);
  padding: 5px;
  border: 1.5px solid var(--main-color);
  border-radius: 5px;

  outline: transparent;

  font-size: 18px;
`;

export const LessonInfoBox = styled.div`
  position: absolute;
  top: 35px;
  right: 65px;
  z-index: 25;
  max-width: 280px;
  color: #fff;
  font-size: 28px;
  font-weight: 500;

  display: flex;
  gap: 25px;
  pointer-events: none;
`;
