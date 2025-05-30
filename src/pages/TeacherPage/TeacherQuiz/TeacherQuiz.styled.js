import styled from 'styled-components';
import { TeacherChartBtnBox } from '../StudentChart/StudentChart.styled';
import { ReactComponent as _QR_pedagogium_logistics_2 } from '../../../img/qr/pedagogium-logistics_2.svg';

export const TeacherInputBox = styled.div`
  position: absolute;
  bottom: 110px;
  right: 70px;
  transform: translate(-55px, -70px);
  z-index: 8;
  width: 36%;
  /* overflow: hidden; */
  border-top-left-radius: 5px;

  background-color: white;
  border-radius: 50px;
  overflow: hidden;

  font-family: var(--streams-font-family);

  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;

export const TeacherChatPageContainer = styled.div`
  position: relative;
  font-family: var(--my-ap-font-family);

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-size: auto 40%;
  background-position: top 30px right -44px;
  background-repeat: no-repeat;
  background-color: transparent;
`;

export const TeacherQuizConfirmation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60%;
  height: 45%;
  z-index: 15;

  padding: 30px;

  background-color: white;
  border-radius: 50px;
  overflow: hidden;

  font-family: var(--streams-font-family);

  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;

export const TeacherQuizConfirmationText = styled.h2`
  padding-top: 20px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

export const TeacherQuizConfirmationHighlight = styled.span`
  color: #ff9800;
  font-weight: 700;
`;

export const TeacherQuizConfirmationBtnBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all var(--animation-global);
`;

export const TeacherQuizCorrectList = styled.div`
  position: absolute;
  left: 0%;
  background-color: white;
  padding: 20px 30px;
  height: 100%;
  width: 100%;
  z-index: 16;
`;

export const TeacherQuizCorrectListHeading = styled.h3`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
`;

export const TeacherQuizCorrectListUsers = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const TeacherQuizCorrectListUser = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
`;

export const TeacherQuizCorrectListUserNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  font-size: 16px;
  font-weight: 500;
  border: 0.5px solid #c0c0c0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);

  &.gold {
    background: linear-gradient(135deg, #fff8dc, #ffd700, #ffa500, #fff8dc);
  }
  &.silver {
    background: linear-gradient(135deg, #ffffff, #dcdcdc, #c0c0c0, #a9a9a9, #ffffff);
  }
  &.bronze {
    background: linear-gradient(135deg, #f8f1e7, #cd7f32, #8f5024, #f8f1e7);
  }
`;

export const TeacherQuizCorrectListUserInfo = styled.span`
  font-weight: 700;
`;

export const TeacherQuizCorrectListEndQuizBtnBox = styled(TeacherChartBtnBox)`
  right: 30px;
`;

export const QRPedagogiumLogistics2 = styled(_QR_pedagogium_logistics_2)`
  flex: 1;
  width: 100%;
`;
