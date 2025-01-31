import { TeacherChatPageContainer } from './TeacherChat.styled';

export const TeacherInputContainer = ({ socket, answers }) => {
  const emitSomething = () => {
    socket.emit('question:asked', { question: 'howdy' });
  };

  return (
    <TeacherChatPageContainer>
      <button type="button" onClick={emitSomething}>
        Start
      </button>
      {/* <TeacherChatBody socket={socket} messages={messages} room={room} /> */}
    </TeacherChatPageContainer>
  );
};
