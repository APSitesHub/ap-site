import useSize from '@react-hook/size';
import axios from 'axios';
import { Kahoots } from 'components/Stream/Kahoots/Kahoots';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Chat } from 'utils/Chat/Chat';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  BoxHideSwitch,
  ButtonBox,
  ChatBox,
  KahootBtn,
  KahootLogo,
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamSection,
  VideoBox,
} from '../../../components/Stream/Stream.styled';

const ApConf = () => {
  // eslint-disable-next-line
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  // eslint-disable-next-line
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isAnimated, setIsAnimated] = useState(false);
  // eslint-disable-next-line
  const [animatedID, setAnimationID] = useState('');
  const [links, isLoading, currentUser, room] = useOutletContext();
  const chatEl = useRef();
  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);
  const [width, height] = useSize(document.body);
  const [messages, setMessages] = useState([]);

  const toggleKahoot = e => {
    setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isChatOpen || isSupportOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };

  // const toggleChat = () => {
  //   setIsChatOpen(isChatOpen => !isChatOpen);
  //   isKahootOpen || isSupportOpen
  //     ? setIsOpenedLast(isOpenedLast => 'chat')
  //     : setIsOpenedLast(isOpenedLast => '');
  // };
  // const toggleSupport = () => {
  //   setIsSupportOpen(isSupportOpen => !isSupportOpen);
  //   setAnimationID('');
  //   isKahootOpen || isChatOpen
  //     ? setIsOpenedLast(isOpenedLast => 'support')
  //     : setIsOpenedLast(isOpenedLast => '');
  // };

  // const handleSupportClick = data_id => {
  //   setAnimationID(id => (id = data_id));
  //   if (!isAnimated) {
  //     setIsAnimated(isAnimated => !isAnimated);
  //   }
  // };

  const videoBoxWidth =
    chatWidth === 0 && width > height ? width - 300 : width - chatWidth;

  const socketRef = useRef(null);

  useEffect(() => {
    document.title = 'AP Conference | AP Education';

    socketRef.current = io('https://ap-chat-server.onrender.com/');

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake.time);
    });

    const getMessages = async () => {
      console.log('get');
      try {
        const dbMessages = await axios.get(
          `https://ap-chat-server.onrender.com/messages/room`,
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
          await axios.post(
            'https://ap-chat-server.onrender.com/messages',
            data
          );
        } catch (error) {
          console.log(error);
        }
      };
      await updateMessages();
    });

    socketRef.current.on('message:get', async data => {
      setMessages(messages => (messages = [...messages, data]));
    });

    socketRef.current.on('message:pinned', async (id, data) => {
      console.log(id);
      console.log(data);
      setMessages(messages => {
        messages[messages.findIndex(message => message.id === id)].isPinned =
          data.isPinned;
        return [...messages];
      });
    });

    socketRef.current.on('message:delete', async id => {
      console.log('delete fired');
      setMessages(
        messages =>
          (messages = [...messages.filter(message => message.id !== id)])
      );
      const deleteMessage = async () => {
        try {
          await axios.delete(
            `https://ap-chat-server.onrender.com/messages/${id}`
          );
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

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, [currentUser, room]);

  return (
    <>
      {(links.nmt_ukr === undefined || links.nmt_ukr[0] < 10) && !isLoading ? (
        <StreamPlaceHolder>
          <StreamPlaceHolderText>
            Привіт! <br />
            AP Education Center на канікулах до 06.01. Гарних свят!
          </StreamPlaceHolderText>
        </StreamPlaceHolder>
      ) : (
        <>
          <StreamSection
            style={{
              width:
                isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
            }}
          >
            <VideoBox>
              <ReactPlayer
                playing={true}
                muted={true}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { rel: 0 },
                  },
                }}
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                width="100%"
                height="100vh"
                url={links.nmt_ukr}
              />
            </VideoBox>

            <ButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
              <KahootBtn
                onClick={toggleKahoot}
                className={
                  isAnimated && animatedID === 'kahoot_open' ? 'animated' : ''
                }
              >
                <KahootLogo />
              </KahootBtn>

              {/* <ChatBtn
                onClick={toggleChat}
                className={
                  isAnimated && animatedID === 'chat_open' ? 'animated' : ''
                }
              >
                <ChatLogo />
              </ChatBtn> */}
            </ButtonBox>

            <BoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
              {isButtonBoxOpen ? <BoxHideLeftSwitch /> : <BoxHideRightSwitch />}
            </BoxHideSwitch>

            {height > width && (
              <ChatBox
                ref={chatEl}
                className={isChatOpen ? 'shown' : 'hidden'}
                style={
                  isOpenedLast === 'chat' ? { zIndex: '2' } : { zIndex: '1' }
                }
              >
                <Chat
                  socket={socketRef.current}
                  messages={messages}
                  isChatOpen={isChatOpen}
                  currentUser={currentUser}
                />
              </ChatBox>
            )}

            <Kahoots
              sectionWidth={width}
              sectionHeight={height}
              isKahootOpen={isKahootOpen}
              isChatOpen={isChatOpen}
              isOpenedLast={isOpenedLast}
            />
          </StreamSection>
          {width >= height && (
            <ChatBox
              ref={chatEl}
              className={isChatOpen ? 'shown' : 'hidden'}
              style={
                isOpenedLast === 'chat' ? { zIndex: '2' } : { zIndex: '1' }
              }
            >
              <Chat
                socket={socketRef.current}
                messages={messages}
                isChatOpen={isChatOpen}
                currentUser={currentUser}
              />
            </ChatBox>
          )}
        </>
      )}
    </>
  );
};

export default ApConf;
