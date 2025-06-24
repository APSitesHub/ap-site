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
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.activity || currentStudentChart.activity || 0,
    },
    {
      area: 'Gramatyka',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.grammar || currentStudentChart.grammar || 0,
    },
    {
      area: 'Mówienie',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.speaking || currentStudentChart.speaking || 0,
    },
    {
      area: 'Słownictwo',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.lexis || currentStudentChart.lexis || 0,
    },
    {
      area: 'Słuchanie',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.listening || currentStudentChart.listening || 0,
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
              typeof currentStudentChart.feedback?.[
                currentStudentChart.feedback?.length - 1
              ].text === 'string'
                ? currentStudentChart.feedback[
                    currentStudentChart.feedback?.length - 1
                  ].text
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
