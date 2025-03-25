import axios from 'axios';
// import chart from '../../../img/bg/chart.png';
import { ResponsiveBar } from '@nivo/bar';
import {
  ChartAreaLimiter,
  ChartPlaceholder,
  ChartPlaceholderHighlight,
  TeacherChartArea,
  TooltipArea,
  TooltipColorLabel,
  TooltipIdText,
  TooltipValueText,
} from './StudentChart.styled';
import { useEffect } from 'react';
import { QuestionHeader } from '../TeacherPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherAnswersChart = ({ answers, quizType, isQuizActive, setAndSendAnswer }) => {
  const data = Object.keys(answers).map(key => {
    return { answer: key, [key]: answers[key] };
  });

  const theme = {
    text: {
      fontSize: 15,
      fill: '#000',
      outlineWidth: 0.4,
      outlineColor: '#000',
    },
  };

  useEffect(() => {
    return () => {
      //eslint-disable-next-line
      answers = [];
    };
  }, []);

  // simple data array example
  // const data = [
  //   {
  //     Wysoka_precyzja: 28,
  //     Automatyzacja_procesów: 34,
  //     Skrócenie_czasu_produkcji: 14,
  //     Ręczne_sterowanie_każdą_operacją: 11,
  //   },
  // ];

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={data.map(dataObj => Object.keys(dataObj)[1]) || ['answer']}
      indexBy="answer"
      groupMode="stacked"
      layout='vertical'
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      padding={0}
      colors={{ scheme: 'dark2' }}
      axisLeft={{
        tickValues:
          Math.max(...Object.values(answers).map(value => value)) < 15
            ? Math.max(...Object.values(answers).map(value => value))
            : 15,
      }}
      axisBottom={true}
      labelPosition="end"
      labelOffset={12}
      theme={theme}
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
      onClick={barData => {
        console.log(barData);
        // direct state change rerenders the chart, not the best option as for user experience
        // setCorrectAnswer(correctAnswer => (correctAnswer = barData.data.answer));
        
        // variable to be used in request does not rerender the chart but maybe it is better to move it to parent component
        // const correct = barData.data.answer;
        // console.log(correct);
        
        setAndSendAnswer(barData.data.answer);
      }}
    />
  );

  return (
    <>
      <TeacherChartArea>
        <QuestionHeader>
          {quizType === 'input'
            ? 'Text'
            : quizType === 'options'
            ? 'A - B - C'
            : 'True - False'}
        </QuestionHeader>

        {!isQuizActive && !data[0] && (
          <ChartPlaceholder>
            PAY ATTENTION, THE QUIZ IS ABOUT TO{' '}
            <ChartPlaceholderHighlight>START</ChartPlaceholderHighlight>
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
          {isQuizActive && data.length ? (
            <MyResponsiveBar data={data}></MyResponsiveBar>
          ) : (
            <ChartPlaceholder>
              QUIZ IS GO!{' '}
              <ChartPlaceholderHighlight>ANSWER NOW!</ChartPlaceholderHighlight>
            </ChartPlaceholder>
          )}
          {/* <ChartImage src={chart} alt="chart image" /> */}
        </ChartAreaLimiter>
      </TeacherChartArea>
    </>
  );
};
