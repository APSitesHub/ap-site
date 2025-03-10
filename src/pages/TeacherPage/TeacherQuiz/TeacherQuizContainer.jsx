import { useEffect, useState } from 'react';
import {
  TeacherChartBtn,
  TeacherChartBtnBox,
  TeacherChartResetBtn,
} from '../StudentChart/StudentChart.styled';
import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import { TeacherChatPageContainer } from './TeacherQuiz.styled';

export const TeacherQuizContainer = ({ page, quizType, socket, closeInputs }) => {
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);

  const emitQuizStart = () => {
    setAnswers(answers => (answers = { ...{} }));
    socket.emit('question:asked', {
      question: `howdy ${quizType}`,
      page: page,
      quizType: quizType,
    });
    setIsQuizActive(true);
  };

  const emitQuizEnd = () => {
    setAnswers(answers => (answers = { ...{} }));
    socket.emit('question:closed', { question: 'bye', page: page, quizType: quizType });
    closeInputs();
    setIsQuizActive(false);
  };

  useEffect(() => {
    socket &&
      socket.on('answer:acquired', (answer, answerPage) => {
        if (page === answerPage) {
          const answerNumbers = answers.hasOwnProperty(answer) ? answers[answer] + 1 : 1;
          setAnswers(answers => (answers = { ...answers, [answer]: answerNumbers }));
        }
      });
  }, [socket, answers, page]);

  return (
    <TeacherChatPageContainer>
      <TeacherAnswersChart
        answers={answers}
        quizType={quizType}
        isQuizActive={isQuizActive}
      />
      <TeacherChartBtnBox>
        {!isQuizActive && (
          <TeacherChartBtn type="button" onClick={emitQuizStart}>
            Start
          </TeacherChartBtn>
        )}
        {isQuizActive && (
          <TeacherChartResetBtn type="button" onClick={emitQuizEnd}>
            End
          </TeacherChartResetBtn>
        )}
      </TeacherChartBtnBox>
    </TeacherChatPageContainer>
  );
};
