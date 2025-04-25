import { useEffect, useRef, useState } from 'react';
import {
  TeacherChartBtn,
  TeacherChartBtnBox,
  TeacherChartResetBtn,
} from '../StudentChart/StudentChart.styled';
import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import { TeacherChatPageContainer, TeacherQuizConfirmation } from './TeacherQuiz.styled';

export const TeacherQuizContainer = ({
  page,
  quizType,
  socket,
  closeInputs,
  questionID,
  changeQuestionID,
}) => {
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const correctAnswer = useRef('');

  const emitQuizStart = () => {
    setAnswers(answers => (answers = { ...{} }));
    console.log(socket.id, 'socket.id');
    console.log(questionID, 'questionID.current');

    socket.emit('question:asked', {
      іd: socket.id,
      question: questionID,
      page: page,
      quizType: quizType,
    });
    setIsQuizActive(true);
    changeQuestionID();
    console.log(questionID, 'questionID.current after emitQuizStart');
  };

  const emitQuizEnd = () => {
    setAnswers(answers => (answers = { ...{} }));
    socket.emit('question:closed', { question: 'bye', page: page, quizType: quizType });
    closeInputs();
    setIsQuizActive(false);
  };

  const setAndSendAnswer = answer => {
    correctAnswer.current = answer;
    setIsConfirmationOpen(true);
  };

  const sendConfirmedAnswer = () => {
    console.log(answers, 'answers before sendConfirmedAnswer');
    
    // add request to server to save the correct answer
    setIsConfirmationOpen(false);
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
      {isConfirmationOpen && (
        <TeacherQuizConfirmation>
          <h3>{correctAnswer.current}? </h3>
          <TeacherChartBtn onClick={sendConfirmedAnswer}>Yes</TeacherChartBtn>
          <TeacherChartResetBtn
            onClick={() => {
              setAnswers(answers => {
                delete answers[correctAnswer.current];
                return answers;
              });

              setIsConfirmationOpen(false);
            }}
          >
            Delete
          </TeacherChartResetBtn>
        </TeacherQuizConfirmation>
      )}
      <TeacherAnswersChart
        answers={answers}
        quizType={quizType}
        isQuizActive={isQuizActive}
        setAndSendAnswer={setAndSendAnswer}
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
