import { ResponsiveRadar } from '@nivo/radar';
import axios from 'axios';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from 'pages/MyAP/Points/Points.styled';
import { useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import { EditFormHeader } from '../TeacherPage.styled';
import {
  ChartAreaMyAPLimiter,
  FeedbackButton,
  FeedbackButtonsBox,
  FeedbackText,
  MyAPGradientBg,
  MyAPStudentChartArea,
  NextFeedbackButton,
  PreviousFeedbackButton,
} from './StudentChart.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const regex = /\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}:/g;
const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

export const MyAPStudentChart = ({ currentStudentChart }) => {
  const [feedbackIndex, setFeedbackIndex] = useState(
    !!currentStudentChart.feedback && currentStudentChart.feedback.length - 1
  );

  const getPreviousFeedback = async () => {
    setFeedbackIndex(feedbackIndex => feedbackIndex - 1);
  };

  const getNextFeedback = async () => {
    setFeedbackIndex(feedbackIndex => feedbackIndex + 1);
  };

  const data = currentStudentChart.feedback
    ? [
        {
          area: 'Активність',
          [currentStudentChart.name]:
            currentStudentChart.feedback[feedbackIndex]?.activity ||
            currentStudentChart.activity ||
            0,
        },
        {
          area: 'Граматика',
          [currentStudentChart.name]:
            currentStudentChart.feedback[feedbackIndex]?.grammar ||
            currentStudentChart.grammar ||
            0,
        },
        {
          area: 'Говоріння',
          [currentStudentChart.name]:
            currentStudentChart.feedback[feedbackIndex]?.speaking ||
            currentStudentChart.speaking ||
            0,
        },
        {
          area: 'Лексика',
          [currentStudentChart.name]:
            currentStudentChart.feedback[feedbackIndex]?.lexis ||
            currentStudentChart.lexis ||
            0,
        },
        {
          area: 'Слухання',
          [currentStudentChart.name]:
            currentStudentChart.feedback[feedbackIndex]?.listening ||
            currentStudentChart.listening ||
            0,
        },
      ]
    : null;

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
        {!currentStudentChart.feedback?.length ? (
          <PointsPlaceHolder>
            <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
            <PointsPlaceHolderText>Схоже, поки що відгуків немає.</PointsPlaceHolderText>
            <PointsPlaceHolderText>
              Ваш перший відгук залишить вам викладач після практичного заняття.
            </PointsPlaceHolderText>
            <PointsPlaceHolderText>Бажаємо успіху!</PointsPlaceHolderText>
          </PointsPlaceHolder>
        ) : (
          <>
            <EditFormHeader id="focus">{currentStudentChart.name}</EditFormHeader>
            <FeedbackButtonsBox>
              <FeedbackButton
                onClick={getPreviousFeedback}
                disabled={feedbackIndex === 0}
                className="prev"
              >
                <PreviousFeedbackButton />
              </FeedbackButton>
              <FeedbackButton
                onClick={getNextFeedback}
                disabled={feedbackIndex === currentStudentChart.feedback?.length - 1}
                className="next"
              >
                <NextFeedbackButton />
              </FeedbackButton>
            </FeedbackButtonsBox>
            <FeedbackText
              dangerouslySetInnerHTML={{
                __html:
                  typeof currentStudentChart.feedback[feedbackIndex].text === 'string'
                    ? currentStudentChart.feedback[feedbackIndex].text
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
          </>
        )}
      </MyAPStudentChartArea>
    </>
  );
};
