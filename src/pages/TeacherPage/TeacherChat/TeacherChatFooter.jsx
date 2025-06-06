import { useState } from 'react';
import { animateScroll } from 'react-scroll';
import {
  ChatFooterBox,
  ChatMessageForm,
  ChatSend,
  ChatWindowedMessageInput,
  СhatSendMessageButton,
} from './TeacherChat.styled';

export const TeacherChatFooter = ({ socket, room }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async e => {
    e.preventDefault();
    console.log(message);
    console.log(message.trim() && localStorage.getItem('userName'));
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        username: localStorage.getItem('userName'),
        userID: localStorage.getItem('userID'),
        userIP: 'no ip',
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        roomLocation: room,
      });
    }
    console.log({ userName: localStorage.getItem('userName'), message });
    setMessage('');

    animateScroll.scrollToBottom({
      containerId: 'chat-box',
      duration: 0,
    });
  };

  return (
    <ChatFooterBox>
      <ChatMessageForm className="form" onSubmit={handleSendMessage}>
        <ChatWindowedMessageInput
          type="text"
          placeholder="Введіть повідомлення"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <СhatSendMessageButton>
          <ChatSend />
        </СhatSendMessageButton>
      </ChatMessageForm>
    </ChatFooterBox>
  );
};
