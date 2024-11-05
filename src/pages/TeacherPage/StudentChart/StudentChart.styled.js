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