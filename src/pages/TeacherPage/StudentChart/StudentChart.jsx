import { ResponsiveRadar } from '@nivo/radar';
import { EditFormHeader } from '../TeacherPage.styled';
import { GradientBg, StudentChartArea } from './StudentChart.styled';

import 'react-datepicker/dist/react-datepicker.css';

export const StudentChart = ({ currentStudentChart }) => {
  const data = [
    {
      area: 'Активність',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.activity || currentStudentChart.activity || 0,
    },
    {
      area: 'Граматика',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.grammar || currentStudentChart.grammar || 0,
    },
    {
      area: 'Говоріння',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.speaking || currentStudentChart.speaking || 0,
    },
    {
      area: 'Лексика',
      [currentStudentChart.name]:
        currentStudentChart.feedback[0]?.lexis || currentStudentChart.lexis || 0,
    },
    {
      area: 'Слухання',
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
      margin={{ top: 20, right: 70, bottom: 40, left: 70 }}
      borderColor={{ from: 'color' }}
      gridLevels={3}
      gridLabelOffset={16}
      dotSize={5}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={3}
      colors={{ scheme: 'dark2' }}
      fillOpacity={0.15}
      blendMode="multiply"
      motionConfig="wobbly"
    />
  );

  return (
    <>
      <StudentChartArea>
        <EditFormHeader id="focus">
          {currentStudentChart.name +
            (currentStudentChart.age &&
            currentStudentChart.age !== 'N/A' &&
            currentStudentChart.age !== '0' &&
            currentStudentChart.age !== '-'
              ? ', ' + currentStudentChart.age + 'р.'
              : '')}
        </EditFormHeader>
        <GradientBg id="chartbg" />
        <MyResponsiveRadar data={data}></MyResponsiveRadar>
      </StudentChartArea>
    </>
  );
};
