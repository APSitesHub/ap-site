import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ChatWindowed } from 'utils/Chat/ChatWindowed/ChatWindowed';
import { ChatWindowedBox } from '../../../components/Stream/Stream.styled';

export const WindowedChat = () => {
  const [messages, setMessages] = useState([]);

  const room = useLocation().pathname.split('-chat')[0];

  console.log(room);

  const socketRef = useRef(null);

  useEffect(() => {
    document.title = 'AP Chat Window';

    socketRef.current = io('https://ap-chat.onrender.com/');

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

    socketRef.current.on('message:deleted', async id => {
      console.log(id);
      setMessages(
        messages =>
          (messages = [...messages.filter(message => message.id !== id)])
      );
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
      <ChatWindowedBox>
        <ChatWindowed
          socket={socketRef.current}
          messages={messages}
          room={room}
        />
      </ChatWindowedBox>
    </>
  );
};
