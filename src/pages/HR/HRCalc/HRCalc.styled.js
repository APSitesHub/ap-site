import {
  PointsCategory,
  PointsCategoryPicker,
  PointsCategoryPointer,
} from 'pages/MyAP/Points/Points.styled';
import styled from 'styled-components';

export const CalcBox = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: white;

  display: flex;
  flex-direction: column;
  font-family: var(--new-font-family);

  overflow: hidden;
  padding: 58px 20px;
  padding-top: 52px;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }
`;

export const CalcHeading = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
`;

export const CalcDescription = styled.p`
  text-align: center;
  font-size: 16px;
  line-height: 1.3;
`;

export const CalcPipe = styled.div`
  width: 100%;
  height: 2px;
  opacity: 0.1;
  background-color: var(--main-color);
  margin-bottom: 24px;
`;

export const CalcPipeBottom = styled(CalcPipe)`
  margin: 32px 0;
`;

export const Calc = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CalcItem = styled.li`
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
`;

export const CalcText = styled.p`
  margin-bottom: 12px;
`;

export const CalcLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const CalcInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CalcInput = styled.input`
  border-radius: 12px;
  border: 1.5px solid #0f645b;
  text-align: center;
  font-size: 18px;
  padding: 15px;
  max-width: 67px;
`;

export const CalcSum = styled.span`
  font-size: 18px;
  opacity: 0.4;
  font-weight: 400;

  &.active {
    opacity: 1;
  }
`;

export const CalcEquals = styled(CalcSum)`
  font-size: 18px;
  opacity: 0.4;
  font-weight: 400;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity var(--animation-global);

  &.active {
    opacity: 1;
  }
`;

export const CalcHours = styled(CalcSum)``;

export const CalcTotal = styled.div`
  font-weight: 700;
`;

export const CalcTotalText = styled(CalcText)`
  margin-bottom: 18px;
`;

export const CalcTotalSum = styled.span`
  font-weight: 700;
  font-size: 18px;
  opacity: 0.4;
  transition: opacity var(--animation-global);
  padding: 0 15px;

  &.active {
    opacity: 1;
  }
`;

export const CalcLangPicker = styled(PointsCategoryPicker)`
  font-family: var(--new-font-family);
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const CalcLangPointer = styled(PointsCategoryPointer)`
  height: 2px;
`;

export const CalcLang = styled(PointsCategory)`
  font-family: var(--new-font-family);
  font-size: 18px;
`;

export const Emoji = styled.img`
  display: inline-block;
  pointer-events: none;
`;
