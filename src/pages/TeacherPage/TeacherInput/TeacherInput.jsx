import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  TeacherInputBox
} from './TeacherChat.styled';
import { TeacherInputContainer } from './TeacherInputContainer';

export const TeacherInput = ({ page, isInputOpen, isOpenedLast }) => {
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

    socketRef.current.on('user:ban', async (userID, userIP) => {
      console.log('ban fired');
      const banUser = async () => {
        console.log('request fired');
        console.log(userID);
        console.log(userIP);
        try {
          await axios.patch(`https://ap-chat-server.onrender.com/users/${userID}`, {
            isBanned: true,
          });
        } catch (error) {
          console.log(error);
        }
      };
      await banUser();
    });

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <TeacherInputBox className={isInputOpen ? 'shown' : 'hidden'}>
        <TeacherInputContainer socket={socketRef.current} answers={answers} />
      </TeacherInputBox>
    </>
  );
};
