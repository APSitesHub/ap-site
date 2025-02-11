import axios from 'axios';
// import chart from '../../../img/bg/chart.png';
import { ResponsiveBarCanvas } from '@nivo/bar';
import { QuestionHeader } from '../TeacherPage.styled';
import {
  ChartAreaLimiter,
  TeacherChartArea,
  TooltipArea,
  TooltipColorLabel,
  TooltipIdText,
  TooltipValueText,
} from './StudentChart.styled';

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
    <ResponsiveBarCanvas
      data={data}
      keys={Object.keys(data[0])}
      groupMode="grouped"
      margin={{ top: 30, right: 30, bottom: 15, left: 30 }}
      padding={0.05}
      colors={{ scheme: 'dark2' }}
      labelPosition="end"
      axisBottom={false}
      axisRight={true}
      labelOffset={8}
      tooltip={({ id, value, color }) => (
        <TooltipArea>
          <TooltipColorLabel
            style={{
              backgroundColor: color,
            }}
          ></TooltipColorLabel>{' '}
          <TooltipIdText>{id}: <TooltipValueText>{value}</TooltipValueText></TooltipIdText>
        </TooltipArea>
      )}
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
        <ChartAreaLimiter
          id="chartlimiter"
          style={{
            minWidth: `${
              (document.body.getBoundingClientRect().width / 100) * 36 - 60
            }px`,
          }}
        >
          <MyResponsiveBar data={data}></MyResponsiveBar>
          {/* <ChartImage src={chart} alt="chart image" /> */}
        </ChartAreaLimiter>
      </TeacherChartArea>
    </>
  );
};
