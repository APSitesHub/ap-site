import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { TeacherInputBox } from './TeacherQuiz.styled';
import { TeacherQuizContainer } from './TeacherQuizContainer';

export const TeacherQuizOptions = ({
  page,
  isQuizOptionsOpen,
  closeInputs,
  questionID,
  changeQuestionID,
  uni,
}) => {
  const [answers, setAnswers] = useState([]);
  const quizType = 'options';

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('https://ap-chat-server.onrender.com/');
    // socketRef.current = io('http://localhost:4000/');

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake);
    });

    socketRef.current.on('answer', async data => {
      setAnswers(answers => (answers = [...answers, data]));
    });

    socketRef.current.on('answer:get', async data => {
      console.log(data);
      setAnswers(answers => (answers = [...answers, data]));
    });

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <>
      {isQuizOptionsOpen && (
        <TeacherInputBox className={isQuizOptionsOpen ? 'shown' : 'hidden'}>
          <TeacherQuizContainer
            page={page}
            quizType={quizType}
            socket={socketRef.current}
            answers={answers}
            closeInputs={closeInputs}
            questionID={questionID}
            changeQuestionID={changeQuestionID}
            uni={uni}
          />
        </TeacherInputBox>
      )}
    </>
  );
};
