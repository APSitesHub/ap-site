import styled from 'styled-components';

export const StudentChartArea = styled.div`
  position: fixed;
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
    top: 184px;
  }

  @media screen and (min-height: 768px) {
    height: 556px;
  }
`;

export const TeacherChartArea = styled.div`
  padding: 30px;
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

export const ChartAreaLimiter = styled.div`
  width: 100%;
  max-height: 300px;
  aspect-ratio: 1/1;
  margin: 0 auto;
  position: relative;
`;

export const FeedbackText = styled.p`
  margin: 5px 0 7px 0;
`;

export const ChartImage = styled.img`
  width: 100%;
  height: auto;
`;
