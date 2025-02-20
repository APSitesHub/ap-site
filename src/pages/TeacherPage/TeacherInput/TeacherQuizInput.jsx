import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { TeacherInputBox } from './TeacherChat.styled';
import { TeacherInputContainer } from './TeacherInputContainer';

export const TeacherQuizInput = ({
  page,
  isQuizInputOpen,
  closeInputs,
  isOpenedLast,
}) => {
  const [answers, setAnswers] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000/');

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
      <TeacherInputBox className={isQuizInputOpen ? 'shown' : 'hidden'}>
        <TeacherInputContainer
          socket={socketRef.current}
          answers={answers}
          closeInputs={closeInputs}
        />
      </TeacherInputBox>
    </>
  );
};
