import { ResponsiveRadar } from '@nivo/radar';
import axios from 'axios';
import { EditFormHeader } from '../TeacherPage.styled';
import { StudentChartArea } from './StudentChart.styled';

import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const StudentChart = ({
  currentStudentChart,
  closeCourseLevelEditForm,
}) => {
  const data = [
    {
      area: 'Активність',
      [currentStudentChart.name]: currentStudentChart.activity,
    },
    {
      area: 'Граматика',
      [currentStudentChart.name]: currentStudentChart.grammar,
    },
    {
      area: 'Говоріння',
      [currentStudentChart.name]: currentStudentChart.speaking,
    },
    { area: 'Лексика', [currentStudentChart.name]: currentStudentChart.lexis },
    {
      area: 'Слухання',
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
      margin={{ top: 20, right: 70, bottom: 40, left: 70 }}
      borderColor={{ from: 'color' }}
      gridLevels={3}
      gridLabelOffset={16}
      enableDotLabel={true}
      dotLabelYOffset={18}
      dotSize={4}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{ scheme: 'accent' }}
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
            currentStudentChart.age !== '0'
            &&
            currentStudentChart.age !== '-'
              ? ', ' + currentStudentChart.age + 'р.'
              : '')}
        </EditFormHeader>
        <MyResponsiveRadar data={data}></MyResponsiveRadar>
      </StudentChartArea>
    </>
  );
};
