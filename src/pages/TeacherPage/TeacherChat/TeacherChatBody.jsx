import { useEffect, useRef, useState } from 'react';
import { animateScroll } from 'react-scroll';
import {
  ChatFastScrollButton,
  ChatMessageUsername,
  ChatMessageWrapper,
  ChatMessageYou,
  ChatScrollDownIcon,
  ChatUsernameBox,
  ChatWindowedBanUser,
  ChatWindowedDeleteMessage,
  ChatWindowedDeleteYourMessage,
  ChatWindowedMessageText,
  ChatWindowedMessageUserCloud,
  ChatWindowedMessageYouCloud,
  ChatWindowedMessagesBox,
  ChatWindowedPinnedMessageIcon,
} from './TeacherChat.styled';

export const TeacherChatBody = ({ messages, socket, room }) => {
  const ChatBodyEl = useRef();
  const [scroll, setScroll] = useState(true);
  const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

  useEffect(() => {
    scrollToBottom();
  });

  console.log(room);

  const calculateHeights = () => {
    setScroll(
      scroll =>
        (scroll =
          ChatBodyEl.current.offsetHeight ===
            ChatBodyEl.current.scrollHeight -
              Math.ceil(ChatBodyEl.current.scrollTop) ||
          (ChatBodyEl.current.scrollHeight -
            Math.floor(ChatBodyEl.current.scrollTop) &&
            ChatBodyEl.current.scrollHeight -
              Math.ceil(ChatBodyEl.current.scrollTop) <=
              ChatBodyEl.current.offsetHeight &&
            ChatBodyEl.current.scrollHeight -
              Math.floor(ChatBodyEl.current.scrollTop) <=
              ChatBodyEl.current.offsetHeight))
    );
  };

  const scrollToBottom = () => {
    if (scroll) {
      animateScroll.scrollToBottom({
        containerId: 'chat-box',
        duration: 0,
      });
    }
  };

  const arrowScroll = () => {
    animateScroll.scrollToBottom({
      containerId: 'chat-box',
      duration: 0,
    });
  };

  const pinMessage = message => {
    socket.emit('message:pin', message.id, { isPinned: !message.isPinned });
  };

  const deleteMessage = async message => {
    socket.emit('message:delete', message.id);
  };

  const banUser = async (userID, userIP) => {
    console.log(userID, userIP);
    socket.emit('user:ban', userID, userIP);
  };

  return (
    <>
      <ChatWindowedMessagesBox
        id="chat-box"
        ref={ChatBodyEl}
        onScroll={calculateHeights}
      >
        {messages.map(message =>
          message.roomLocation === room ? (
            message.username === localStorage.getItem('userName') &&
            message.userID === localStorage.getItem('userID') ? (
              <ChatMessageWrapper key={message.id}>
                <ChatMessageYou className="sender__name">
                  Ви ({message.username})
                </ChatMessageYou>
                <ChatWindowedMessageYouCloud>
                  <ChatWindowedDeleteYourMessage
                    onClick={() => deleteMessage(message)}
                    id={message._id}
                  />
                  <ChatWindowedPinnedMessageIcon
                    className={message.isPinned ? 'pinned' : ''}
                    onClick={() => pinMessage(message)}
                    id={message.id}
                  />
                  <ChatWindowedMessageText
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(
                        linksRegex,
                        match =>
                          `<a href="${match}" target="_blank">${match}</a>`
                      ),
                    }}
                  ></ChatWindowedMessageText>
                  {/* <ChatMessageTime>
                    {new Date(message.createdAt).toLocaleTimeString('uk-UA')}
                  </ChatMessageTime> */}
                </ChatWindowedMessageYouCloud>
              </ChatMessageWrapper>
            ) : (
              <ChatMessageWrapper key={message.id}>
                <ChatMessageUsername>
                  <ChatUsernameBox>
                    {message.username}
                    <ChatWindowedBanUser
                      onClick={() => banUser(message.userID, message.userIP)}
                    />
                  </ChatUsernameBox>
                </ChatMessageUsername>
                <ChatWindowedMessageUserCloud className="message__recipient">
                  <ChatWindowedDeleteMessage
                    onClick={() => deleteMessage(message)}
                    id={message._id}
                  />
                  <ChatWindowedMessageText
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(
                        linksRegex,
                        match =>
                          `<a href="${match}" target="_blank">${match}</a>`
                      ),
                    }}
                  ></ChatWindowedMessageText>
                  {/* <ChatMessageTime>
                    {new Date(message.createdAt).toLocaleTimeString('uk-UA')}
                  </ChatMessageTime> */}
                </ChatWindowedMessageUserCloud>
              </ChatMessageWrapper>
            )
          ) : null
        )}
      </ChatWindowedMessagesBox>
      {!scroll && (
        <ChatFastScrollButton onClick={arrowScroll}>
          <ChatScrollDownIcon />
        </ChatFastScrollButton>
      )}
    </>
  );
};
