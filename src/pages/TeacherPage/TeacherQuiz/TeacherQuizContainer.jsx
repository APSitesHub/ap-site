import { useEffect, useState } from 'react';
import {
  TeacherChartBtn,
  TeacherChartBtnBox,
  TeacherChartResetBtn,
} from '../StudentChart/StudentChart.styled';
import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import { TeacherChatPageContainer } from './TeacherQuiz.styled';

export const TeacherQuizContainer = ({
  page,
  quizType,
  socket,
  closeInputs,
  isQuizInputOpen,
  isQuizOptionsOpen,
  isQuizTrueFalseOpen,
}) => {
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  // console.log(7, socket);
  // console.log(8, page);
  // console.log(9, quizType);

  // eslint-disable-next-line
  const emitQuizStart = () => {
    // if (isQuizInputOpen && quizType === 'input') {
    //   setAnswers(answers => (answers = { ...{} }));
    //   socket.emit('question:closed', {
    //     question: 'options bye',
    //     page: page,
    //     quizType: 'options',
    //   });
    //   socket.emit('question:closed', {
    //     question: 'trueFalse bye',
    //     page: page,
    //     quizType: 'trueFalse',
    //   });
    //   closeInputs();
    // }
    // if (isQuizOptionsOpen && quizType === 'options') {
    //   setAnswers(answers => (answers = { ...{} }));
    //   socket.emit('question:closed', {
    //     question: 'input bye',
    //     page: page,
    //     quizType: 'input',
    //   });
    //   socket.emit('question:closed', {
    //     question: 'trueFalse bye',
    //     page: page,
    //     quizType: 'trueFalse',
    //   });
    //   closeInputs();
    // }
    // if (isQuizTrueFalseOpen && quizType === 'trueFalse') {
    //   setAnswers(answers => (answers = { ...{} }));
    //   socket.emit('question:closed', {
    //     question: 'input bye',
    //     page: page,
    //     quizType: 'input',
    //   });
    //   socket.emit('question:closed', {
    //     question: 'options bye',
    //     page: page,
    //     quizType: 'options',
    //   });
    //   closeInputs();
    // }
    setAnswers(answers => (answers = { ...{} }));
    socket.emit('question:asked', { question: `howdy ${quizType}`, page: page, quizType: quizType });
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

    return () => {};
  }, [socket, answers, page]);

  return (
    <TeacherChatPageContainer>
      <TeacherAnswersChart page={page} answers={answers} isQuizActive={isQuizActive} />
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
