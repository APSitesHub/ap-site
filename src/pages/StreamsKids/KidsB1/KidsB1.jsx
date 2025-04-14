import useSize from '@react-hook/size';
import axios from 'axios';
import { Kahoots } from 'components/Stream/Kahoots/Kahoots';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';
import { Support } from 'components/Stream/Support/Support';
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
  ChatBtn,
  ChatLogo,
  KahootBtn,
  KahootLogo,
  MoldingNoClick,
  MoldingNoClickSecondary,
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamSection,
  SupportArrow,
  SupportBtn,
  SupportLogo,
  SupportMarkerLeft,
  SupportMarkerRight,
  SupportPointer,
  VideoBox,
} from '../../../components/Stream/Stream.styled';

const KidsB1 = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedID, setAnimationID] = useState('');
  const [links, isLoading, currentUser, room] = useOutletContext();
  const chatEl = useRef();
  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);
  const [width, height] = useSize(document.body);
  const [isBanned, setIsBanned] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleKahoot = e => {
    setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isChatOpen || isSupportOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleChat = () => {
    setIsChatOpen(isChatOpen => !isChatOpen);
    isKahootOpen || isSupportOpen
      ? setIsOpenedLast(isOpenedLast => 'chat')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleSupport = () => {
    setIsSupportOpen(isSupportOpen => !isSupportOpen);
    setAnimationID('');
    isKahootOpen || isChatOpen
      ? setIsOpenedLast(isOpenedLast => 'support')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleQuizInput = () => {
    setIsQuizInputOpen(isQuizInputOpen => !isQuizInputOpen);
  };
  const toggleQuizOptions = () => {
    setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen);
  };
  const toggleQuizTrueFalse = () => {
    setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen);
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };
  const handleSupportClick = data_id => {
    setAnimationID(id => (id = data_id));
    if (!isAnimated) {
      setIsAnimated(isAnimated => !isAnimated);
    }
  };

  const videoBoxWidth =
    chatWidth === 0 && width > height ? width - 300 : width - chatWidth;

  const socketRef = useRef(null);

  useEffect(() => {
    document.title = 'B1 English Kids | AP Education';

    socketRef.current = io('https://ap-chat-server.onrender.com/');
    // socketRef.current = io('http://localhost:4000/');

    const handleDisconnect = () => {
      socketRef.current.emit('connected:disconnect', socketRef.current.id, room);
    };

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake.time);
      socketRef.current.emit('connected:user', socketRef.current.id, room);
    });

    // open quizzes on event
    socketRef.current.on('question:input', data => {
      console.log(data.page);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizInputOpen(true);
    });
    socketRef.current.on('question:options', data => {
      console.log(data.page);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizOptionsOpen(true);
    });
    socketRef.current.on('question:trueFalse', data => {
      console.log(data.page);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizTrueFalseOpen(true);
    });

    // close quizzes on event
    socketRef.current.on('question:closeInput', data => {
      console.log(data);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizInputOpen(false);
    });
    socketRef.current.on('question:closeOptions', data => {
      console.log(data);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizOptionsOpen(false);
    });
    socketRef.current.on('question:closeTrueFalse', data => {
      console.log(data);
      data.page === room.replace('/streams-kids/', '') + 'kids' &&
        setIsQuizTrueFalseOpen(false);
    });

    socketRef.current.on('connected:user', (id, lvl) => {
      console.log(id);
      console.log(lvl);
    });

    const getMessages = async () => {
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
          message => new Date(message.createdAt).getDate() === new Date().getDate()
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
          await axios.post('https://ap-chat-server.onrender.com/messages', data);
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
        messages => (messages = [...messages.filter(message => message.id !== id)])
      );
      const deleteMessage = async () => {
        try {
          await axios.delete(`https://ap-chat-server.onrender.com/messages/${id}`);
        } catch (error) {
          console.log(error);
        }
      };
      await deleteMessage();
    });

    socketRef.current.on('message:deleted', async id => {
      console.log(id);
      setMessages(
        messages => (messages = [...messages.filter(message => message.id !== id)])
      );
    });

    socketRef.current.on('user:banned', async (userID, userIP) => {
      console.log(userID);
      console.log(userIP);
      if (userID === currentUser.userID) {
        setIsBanned(true);
      }
    });

    window.addEventListener('beforeunload', handleDisconnect);

    return () => {
      window.removeEventListener('beforeunload', handleDisconnect);

      console.log('disconnecting');
      handleDisconnect();
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.off('user');
      socketRef.current.disconnect();
    };
  }, [currentUser, room]);

  return (
    <>
      {(links.b1kids === undefined || links.b1kids[0] < 10) && !isLoading ? (
        <StreamPlaceHolder>
          <StreamPlaceHolderText>
            Христос воскрес! <br />
            AP Education Center на канікулах з 17 по 23 квітня. <br />
            Побачимось після свят!
          </StreamPlaceHolderText>
        </StreamPlaceHolder>
      ) : currentUser.isBanned || isBanned ? (
        <StreamPlaceHolder>
          <StreamPlaceHolderText>
            Хмммм, схоже що ви були нечемні! <br />
            Вас було заблоковано за порушення правил нашої платформи. Зв'яжіться зі своїм
            менеджером сервісу!
          </StreamPlaceHolderText>
        </StreamPlaceHolder>
      ) : (
        <>
          <StreamSection
            style={{
              width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
            }}
          >
            <VideoBox>
              <MoldingNoClick />
              <MoldingNoClickSecondary />
              <SupportMarkerLeft
                className={
                  (isAnimated && animatedID === 'sound') ||
                  (isAnimated && animatedID === 'live')
                    ? 'animated'
                    : ''
                }
              >
                <SupportArrow
                  className={
                    (isAnimated && animatedID === 'sound') ||
                    (isAnimated && animatedID === 'live')
                      ? 'animated'
                      : ''
                  }
                />
              </SupportMarkerLeft>
              <SupportMarkerRight
                className={isAnimated && animatedID === 'quality' ? 'animated' : ''}
              >
                <SupportPointer
                  className={isAnimated && animatedID === 'quality' ? 'animated' : ''}
                />
              </SupportMarkerRight>
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
                url={links.b1kids}
              />
            </VideoBox>

            <ButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
              <KahootBtn
                onClick={toggleKahoot}
                className={isAnimated && animatedID === 'kahoot_open' ? 'animated' : ''}
              >
                <KahootLogo />
              </KahootBtn>

              <ChatBtn
                onClick={toggleChat}
                className={isAnimated && animatedID === 'chat_open' ? 'animated' : ''}
              >
                <ChatLogo />
              </ChatBtn>

              <SupportBtn onClick={toggleSupport}>
                <SupportLogo />
              </SupportBtn>
            </ButtonBox>

            <BoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
              {isButtonBoxOpen ? <BoxHideLeftSwitch /> : <BoxHideRightSwitch />}
            </BoxHideSwitch>

            {height > width && (
              <ChatBox
                ref={chatEl}
                className={isChatOpen ? 'shown' : 'hidden'}
                style={isOpenedLast === 'chat' ? { zIndex: '2' } : { zIndex: '1' }}
              >
                <Chat
                  socket={socketRef.current}
                  messages={messages}
                  isChatOpen={isChatOpen}
                  currentUser={currentUser}
                />
              </ChatBox>
            )}

            <StudentInput
              isInputOpen={isQuizInputOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizInput}
              page={room.replace('/streams-kids/', '') + 'kids'}
              currentUser={currentUser}
            />

            <StudentOptions
              isInputOpen={isQuizOptionsOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizOptions}
              page={room.replace('/streams-kids/', '') + 'kids'}
              currentUser={currentUser}
            />

            <StudentTrueFalse
              isInputOpen={isQuizTrueFalseOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizTrueFalse}
              page={room.replace('/streams-kids/', '') + 'kids'}
              currentUser={currentUser}
            />

            <Support
              sectionWidth={width}
              isSupportOpen={isSupportOpen}
              isOpenedLast={isOpenedLast}
              handleSupport={handleSupportClick}
              openKahoot={toggleKahoot}
              isKahootOpen={isKahootOpen}
            />

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
              style={isOpenedLast === 'chat' ? { zIndex: '2' } : { zIndex: '1' }}
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

export default KidsB1;
