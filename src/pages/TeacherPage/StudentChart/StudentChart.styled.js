import styled from 'styled-components';
import { ReactComponent as ArrowPrevious } from '../../../img/svg/arrow-left.svg';
import { ReactComponent as ArrowNext } from '../../../img/svg/arrow-right.svg';

export const StudentChartArea = styled.div`
  position: fixed;
  font-family: var(--my-ap-font-family);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 20px);
  max-width: 500px;
  height: 500px;

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

export const MyAPStudentChartArea = styled(StudentChartArea)`
  position: absolute;
  top: 30px;
  left: unset;
  right: 60px;
  z-index: 5;
  transform: translate(0, 0);
  width: calc(100% - 65px);
  max-height: 556px;
  overflow-y: scroll;

  @media screen and (min-width: 480px) {
    width: 362px;
  }

  @media screen and (min-width: 768px) {
    width: 480px;
    right: 90px;
    scrollbar-width: none;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
    height: 400px;
  }

  @media screen and (min-height: 640px) {
    top: 145px;
  }

  @media screen and (min-height: 768px) {
    height: 556px;
  }
`;

export const MyAPStudentChartAreaTrial = styled(MyAPStudentChartArea)`
  z-index: 8;
`;

export const TeacherChartBtnBox = styled.div`
  position: absolute;
  bottom: 30px;

  display: flex;
  gap: 20px;
`;

export const TeacherChartBtn = styled.button`
  min-width: 150px;

  font-family: var(--my-ap-font-family);
  font-size: 16px;
  border-radius: 50px;
  padding: 20px 20px;
  background: radial-gradient(70% 80% at -13.25% 26%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(70% 80% at 113.25% 74%, #0f645b 6.9%, rgba(0, 0, 0, 0) 100%), #000;

  color: #fff;
  font-family: var(--new-font-family);
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  border: transparent;
`;

export const TeacherChartResetBtn = styled(TeacherChartBtn)`
  background: none;
  color: #000;
  border: 2px solid #0f645b;
`;

export const TeacherChartArea = styled.div`
  padding: 30px;
  padding-bottom: 110px;
`;

export const GradientBg = styled.div`
  position: absolute;
  top: calc(50% + 23px);
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0.15;

  width: 313px;
  height: 313px;
  background: radial-gradient(red 0% 23%, yellow 24% 46%, green 47% 100%);
`;

export const MyAPGradientBg = styled(GradientBg)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 20px);
  height: auto;
  aspect-ratio: 1/1;

  @media screen and (min-width: 640px) {
    width: 260px;
    height: 260px;
  }
`;

export const ChartPlaceholder = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const ChartPlaceholderHighlight = styled.span`
  color: var(--main-color);
`;

export const ChartAreaMyAPLimiter = styled.div`
  width: 100%;
  max-height: 300px;
  margin: 0 auto;
  position: relative;
  aspect-ratio: 1/1;
  transform-origin: bottom;
  transition: transform var(--animation-global);
`;

export const ChartAreaLimiter = styled(ChartAreaMyAPLimiter)`
  transform: scaleY(0);
  max-height: 350px;

  &.active {
    transform: scaleY(1);
  }
`;

export const FeedbackText = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 5px 0 7px 0;
`;

export const ChartImage = styled.img`
  width: 100%;
  height: auto;
`;

export const TooltipArea = styled.div`
  background-color: white;
  padding: 8px;
  max-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const TooltipColorLabel = styled.div`
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  border: 0.5px solid gray;
  display: inline-block;
  flex-shrink: 0;
`;

export const TooltipIdText = styled.span``;

export const TooltipValueText = styled.span`
  font-weight: 700;
`;

export const FeedbackButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PreviousFeedbackButton = styled(ArrowPrevious)`
  width: 24px;
  height: 24px;
`;

export const NextFeedbackButton = styled(ArrowNext)`
  width: 24px;
  height: 24px;
`;

export const FeedbackButton = styled.button`
  position: relative;
  background-color: transparent;
  border: 1px solid var(--main-color);
  border-radius: 50px;
  color: var(--main-color);
  font-size: 12px;
  cursor: pointer;
  transition: color var(--animation-global);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  transition: all ease-in-out 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  & svg {
    transition: all var(--animation-global);
  }

  &.prev:hover {
    width: 100px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  }

  &.next:hover {
    width: 100px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  }

  &.prev:hover svg {
    position: absolute;
    transform: scale(0);
  }

  &.next:hover svg {
    position: absolute;
    transform: scale(0);
  }

  &.prev::before {
    content: '';
    opacity: 0;
    transition: all var(--animation-global);
  }

  &.next::before {
    content: '';
    opacity: 0;
    transition: all var(--animation-global);
  }

  &.prev:hover::before {
    content: 'Попередній відгук';
    opacity: 1;
    color: #000000;
    font-weight: 500;
  }

  &.next:hover::before {
    content: 'Наступний відгук';
    opacity: 1;
    color: #000000;
    font-weight: 500;
  }
`;
