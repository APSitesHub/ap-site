import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import { TeacherChatPageContainer } from './TeacherChat.styled';

export const TeacherInputContainer = ({ socket, answers }) => {
  // const emitSomething = () => {
  //   socket.emit('question:asked', { question: 'howdy' });
  // };

  return (
    <TeacherChatPageContainer>
      <TeacherAnswersChart></TeacherAnswersChart>
      {/* <button type="button" onClick={emitSomething}>
        Start
      </button> */}
      {/* <TeacherChatBody socket={socket} messages={messages} room={room} /> */}
    </TeacherChatPageContainer>
  );
};
