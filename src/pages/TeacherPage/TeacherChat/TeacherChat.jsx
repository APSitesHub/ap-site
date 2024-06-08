import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  ChatLoginButton,
  ChatLoginForm,
  ChatLoginHeader,
  ChatLoginInput,
  ChatLoginLabel,
} from 'utils/Chat/Chat.styled';
import {
  ChatHideLeftSwitch,
  ChatHideRightSwitch,
  TeacherChatBox,
  TeacherChatSwitch,
} from './TeacherChat.styled';
import { TeacherChatContainer } from './TeacherChatContainer';

export const TeacherChat = ({ page }) => {
  const [userName, setUserName] = useState('');
  // eslint-disable-next-line
  const [userID, setUserID] = useState('');
  const [isLoggedToChat, setIsLoggedToChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  console.log(page);
  const getMessagesByPage = page =>
    page.includes('kidsfree')
      ? '/streams-kids/' + page.replace('kids', '')
      : page.includes('beginner')
      ? '/streams-kids/' + page.replace('kids', '')
      : page.includes('kids')
      ? '/streams-kids/' + page.split('kids')[0]
      : '/streams/' + page;

  const room = getMessagesByPage(page);
  console.log(room);

  const checkLogin = e => {
    const name = localStorage.getItem('userName');
    const id = localStorage.getItem('userID');

    if (!id && name) {
      const idGen = nanoid(8);
      setUserID(id => (id = idGen));
      localStorage.setItem('userID', idGen);
    }

    if (id && name) {
      setIsLoggedToChat(isLogged => (isLogged = true));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const idGen = nanoid(8);
    setUserID(id => (id = idGen));
    localStorage.setItem('userName', userName.trim());
    localStorage.setItem('userID', idGen);
    localStorage.setItem('APLoggedIn', true);
    setIsLoggedToChat(isLogged => !isLogged);
  };

  const socketRef = useRef(null);

  useEffect(() => {
    document.title = 'AP Chat Window';

    socketRef.current = io('https://ap-chat.onrender.com/');
    checkLogin();

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake);
    });

    const getMessages = async () => {
      console.log('get');
      try {
        const dbMessages = await axios.get(
          `https://ap-chat.onrender.com/messages/room`,
          {
            params: {
              room,
            },
          }
        );
        const todayMessages = dbMessages.data.filter(
          message =>
            new Date(message.createdAt).getDate() === new Date().getDate()
        );
        console.log(todayMessages);
        setMessages(messages => (messages = todayMessages));
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();

    socketRef.current.on('message', async data => {
      setMessages(messages => (messages = [...messages, data]));
      const updateMessages = async () => {
        try {
          await axios.post('https://ap-chat.onrender.com/messages', data);
        } catch (error) {
          console.log(error);
        }
      };
      await updateMessages();
    });

    socketRef.current.on('message:get', async data => {
      console.log(data);
      setMessages(messages => (messages = [...messages, data]));
    });

    socketRef.current.on('message:pin', async (id, data) => {
      setMessages(messages => {
        messages[messages.findIndex(message => message.id === id)].isPinned =
          data.isPinned;
        return [...messages];
      });
      const editMessage = async () => {
        try {
          await axios.patch(
            `https://ap-chat.onrender.com/messages/${id}`,
            data
          );
        } catch (error) {
          console.log(error);
        }
      };
      await editMessage();
    });

    socketRef.current.on('message:delete', async id => {
      console.log('delete fired');
      setMessages(
        messages =>
          (messages = [...messages.filter(message => message.id !== id)])
      );
      const deleteMessage = async () => {
        try {
          await axios.delete(`https://ap-chat.onrender.com/messages/${id}`);
        } catch (error) {
          console.log(error);
        }
      };
      await deleteMessage();
    });

    socketRef.current.on('user:ban', async (userID, userIP) => {
      console.log('ban fired');
      const banUser = async () => {
        console.log('request fired');
        console.log(userID);
        console.log(userIP);
        try {
          await axios.patch(`https://ap-chat.onrender.com/users/${userID}`, {
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
  }, [room]);

  return (
    <>
      <TeacherChatBox className={isChatOpen ? 'shown' : 'hidden'}>
        <TeacherChatSwitch onClick={toggleChat}>
          {isChatOpen ? <ChatHideRightSwitch /> : <ChatHideLeftSwitch />}
        </TeacherChatSwitch>
        {!isLoggedToChat ? (
          <ChatLoginForm onSubmit={handleSubmit}>
            <ChatLoginHeader>AP Open Chat</ChatLoginHeader>
            <ChatLoginLabel htmlFor="username">
              Введіть ваше ім'я та прізвище повністю
            </ChatLoginLabel>
            <ChatLoginInput
              type="text"
              minLength={3}
              name="username"
              id="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <ChatLoginButton>Готово!</ChatLoginButton>
          </ChatLoginForm>
        ) : (
          <TeacherChatContainer
            socket={socketRef.current}
            messages={messages}
            room={room}
          />
        )}
      </TeacherChatBox>
    </>
  );
};
