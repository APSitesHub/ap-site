import { useEffect, useState } from 'react';
import {
  TeacherChartBtn,
  TeacherChartBtnBox,
  TeacherChartResetBtn,
} from '../StudentChart/StudentChart.styled';
import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import { TeacherChatPageContainer } from './TeacherChat.styled';

export const TeacherInputContainer = ({ socket, closeInputs }) => {
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  console.log(7, socket);

  // eslint-disable-next-line
  const emitQuizStart = () => {
    socket.emit('question:asked', { question: 'howdy' });
    setIsQuizActive(true);
  };

  const emitQuizEnd = () => {
    setAnswers(answers => (answers = {}));
    socket.emit('question:closed', { question: 'bye' });
    closeInputs();
    setIsQuizActive(false);
  };

  useEffect(() => {
    socket &&
      socket.on('answer:acquired', answer => {
        const answerNumbers = answers.hasOwnProperty(answer) ? answers[answer] + 1 : 1;
        setAnswers(answers => (answers = { ...answers, [answer]: answerNumbers }));
      });

    return () => {};
  }, [socket, answers]);

  return (
    <TeacherChatPageContainer>
      <TeacherAnswersChart answers={answers} isQuizActive={isQuizActive} />
      <TeacherChartBtnBox>
        <TeacherChartBtn type="button" onClick={emitQuizStart}>
          Start
        </TeacherChartBtn>
        <TeacherChartResetBtn type="button" onClick={emitQuizEnd}>
          End
        </TeacherChartResetBtn>
      </TeacherChartBtnBox>
      {/* <TeacherChatBody socket={socket} messages={messages} room={room} /> */}
    </TeacherChatPageContainer>
  );
};
