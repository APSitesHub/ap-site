import { TeacherChatPageContainer } from './TeacherChat.styled';
import { TeacherChatBody } from './TeacherChatBody';
import { TeacherChatFooter } from './TeacherChatFooter';

export const TeacherChatContainer = ({ socket, messages, room }) => {
  return (
    <TeacherChatPageContainer>
      <TeacherChatBody socket={socket} messages={messages} room={room} />
      <TeacherChatFooter socket={socket} room={room} />
    </TeacherChatPageContainer>
  );
};
