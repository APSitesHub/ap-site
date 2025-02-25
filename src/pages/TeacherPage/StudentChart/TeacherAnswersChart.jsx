import axios from 'axios';
// import chart from '../../../img/bg/chart.png';
import { ResponsiveBarCanvas } from '@nivo/bar';
import {
  ChartAreaLimiter,
  ChartPlaceholder,
  ChartPlaceholderHighlight,
  TeacherChartArea,
  TooltipArea,
  TooltipColorLabel,
  TooltipIdText,
  TooltipValueText
} from './StudentChart.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherAnswersChart = ({ answers, isQuizActive }) => {
  console.log(answers);

  const data = [answers];

  // const data = [
  //   {
  //     Wysoka_precyzja: 28,
  //     Automatyzacja_procesów: 34,
  //     Skrócenie_czasu_produkcji: 14,
  //     Ręczne_sterowanie_każdą_operacją: 11,
  //   },
  // ];

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
          <TooltipIdText>
            {id.replaceAll('_', ' ')}: <TooltipValueText>{value}</TooltipValueText>
          </TooltipIdText>
        </TooltipArea>
      )}
    />
  );

  return (
    <>
      <TeacherChartArea>
        {/* <QuestionHeader id="focus">Jakie są główne zalety maszyn CNC?</QuestionHeader> */}
        {!isQuizActive && (
          <ChartPlaceholder>
            PAY ATTENTION, THE QUIZ IS ABOUT TO <ChartPlaceholderHighlight>START</ChartPlaceholderHighlight>
          </ChartPlaceholder>
        )}
        <ChartAreaLimiter
          className={isQuizActive ? 'active' : ''}
          id="chartlimiter"
          style={{
            minWidth: `${
              (document.body.getBoundingClientRect().width / 100) * 36 - 60
            }px`,
          }}
        >
          {isQuizActive && <MyResponsiveBar data={data}></MyResponsiveBar>}
          {/* <ChartImage src={chart} alt="chart image" /> */}
        </ChartAreaLimiter>
      </TeacherChartArea>
    </>
  );
};
