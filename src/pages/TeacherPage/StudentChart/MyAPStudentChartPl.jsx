import { ResponsiveRadar } from '@nivo/radar';
import axios from 'axios';
import { EditFormHeader } from '../TeacherPage.styled';
import {
  ChartAreaMyAPLimiter,
  FeedbackText,
  MyAPGradientBg,
  MyAPStudentChartArea,
} from './StudentChart.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const regex = /\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}:/g;
const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

export const MyAPStudentChartPl = ({ currentStudentChart }) => {
  const data = [
    {
      area: 'Aktywność',
      [currentStudentChart.name]: currentStudentChart.activity,
    },
    {
      area: 'Gramatyka',
      [currentStudentChart.name]: currentStudentChart.grammar,
    },
    {
      area: 'Mówienie',
      [currentStudentChart.name]: currentStudentChart.speaking,
    },
    { area: 'Słownictwo', [currentStudentChart.name]: currentStudentChart.lexis },
    {
      area: 'Słuchanie',
      [currentStudentChart.name]: currentStudentChart.listening,
    },
  ];

  const MyResponsiveRadar = ({ data }) => (
    <ResponsiveRadar
      data={data}
      curve="linearClosed"
      keys={[currentStudentChart.name]}
      indexBy="area"
      maxValue={3}
      valueFormat=">-.0f"
      margin={
        document.body.getClientRects()[0].width < 640
          ? { top: 0, right: 10, bottom: 0, left: 10 }
          : { top: 20, right: 60, bottom: 20, left: 60 }
      }
      borderColor={{ from: 'color' }}
      gridLevels={3}
      gridLabelOffset={document.body.getClientRects()[0].width < 640 ? -26 : 16}
      dotSize={document.body.getClientRects()[0].width < 640 ? 3 : 5}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={document.body.getClientRects()[0].width < 640 ? 3 : 3}
      colors={{ scheme: 'dark2' }}
      fillOpacity={0.15}
      blendMode="multiply"
      motionConfig="wobbly"
      theme={
        document.body.getClientRects()[0].width < 640
          ? {
              text: {
                fontSize: 8,
              },
            }
          : {
              text: {
                fontSize: 11,
              },
            }
      }
    />
  );

  return (
    <>
      <MyAPStudentChartArea>
        <EditFormHeader id="focus">Student</EditFormHeader>
        <FeedbackText
          dangerouslySetInnerHTML={{
            __html:
              typeof currentStudentChart.feedback[
                currentStudentChart.feedback.length - 1
              ] === 'string'
                ? currentStudentChart.feedback[currentStudentChart.feedback.length - 1]
                    .replace(
                      linksRegex,
                      match =>
                        `<a href="${match}" target="_blank">${
                          match.length > 50 ? match.slice(0, 50) + '...' : match
                        }</a>`
                    )
                    .replace(regex, '')
                    .trim()
                    .split(' ')
                    .slice(1)
                    .join(' ')
                : '',
          }}
        ></FeedbackText>
        <ChartAreaMyAPLimiter id="chartlimiter">
          <MyAPGradientBg id="chartbg" />
          <MyResponsiveRadar data={data}></MyResponsiveRadar>
        </ChartAreaMyAPLimiter>
      </MyAPStudentChartArea>
    </>
  );
};
