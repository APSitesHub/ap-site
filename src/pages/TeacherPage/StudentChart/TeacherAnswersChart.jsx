import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import chart from '../../../img/bg/chart.png';
import { QuestionHeader } from '../TeacherPage.styled';
import { ChartImage, TeacherChartArea } from './StudentChart.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherAnswersChart = ({ currentStudentChart }) => {
  const data = [
    {
      schronisko: 28,
      hotel: 34,
      motel: 14,
      kamping: 11,
    },
  ];

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={['schronisko', 'hotel', 'motel', 'kamping']}
    />
  );

  return (
    <>
      <TeacherChartArea>
        <QuestionHeader id="focus">
          Jak nazywa się budynek dla turystów? 
          <br />
          Który znajduje się w górach.
        </QuestionHeader>
        {/* <ChartAreaLimiter id="chartlimiter"> */}
          {/* <MyResponsiveBar data={data}></MyResponsiveBar> */}
          <ChartImage src={chart} alt="chart image" />
        {/* </ChartAreaLimiter> */}
      </TeacherChartArea>
    </>
  );
};
