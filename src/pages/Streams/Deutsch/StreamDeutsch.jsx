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

const StreamDeutsch = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedID, setAnimationID] = useState('');
  const [links, isLoading, currentUser, room, user] = useOutletContext();
  const chatEl = useRef();
  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);
  const [width, height] = useSize(document.body);
  const [isBanned, setIsBanned] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const questionID = useRef('');

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
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };
  const handleSupportClick = data_id => {
    setAnimationID(id => (id = data_id));
    if (!isAnimated) {
      setIsAnimated(isAnimated => !isAnimated);
    }
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

  const videoBoxWidth =
    chatWidth === 0 && width > height ? width - 300 : width - chatWidth;

  const socketRef = useRef(null);

  useEffect(() => {
    document.title = 'A1 Deutsch | AP Education';

    socketRef.current = io('https://ap-chat-server.onrender.com/');

    const handleDisconnect = () => {
      socketRef.current.emit('connected:disconnect', socketRef.current.id, room);
    };

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake.time);
      socketRef.current.emit('connected:user', socketRef.current.id, room);
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

    // open quizzes on event
    socketRef.current.on('question:input', data => {
      if (data.page === room.replace('/streams/', '')) {
        questionID.current = data.question;
        setIsQuizInputOpen(true);
      }
    });
    socketRef.current.on('question:options', data => {
      if (data.page === room.replace('/streams/', '')) {
        questionID.current = data.question;
        setIsQuizOptionsOpen(true);
      }
    });
    socketRef.current.on('question:trueFalse', data => {
      if (data.page === room.replace('/streams/', '')) {
        questionID.current = data.question;
        setIsQuizTrueFalseOpen(true);
      }
    });

    // close quizzes on event
    socketRef.current.on('question:closeInput', data => {
      data.page === room.replace('/streams/', '') && setIsQuizInputOpen(false);
    });
    socketRef.current.on('question:closeOptions', data => {
      data.page === room.replace('/streams/', '') && setIsQuizOptionsOpen(false);
    });
    socketRef.current.on('question:closeTrueFalse', data => {
      data.page === room.replace('/streams/', '') && setIsQuizTrueFalseOpen(false);
    });

    window.addEventListener('beforeunload', handleDisconnect);

    return () => {
      window.removeEventListener('beforeunload', handleDisconnect);

      console.log('disconnecting');
      handleDisconnect();
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, [currentUser, room]);

  return (
    <>
      {(links.deutsch === undefined || links.deutsch[0] < 10) && !isLoading ? (
        <StreamPlaceHolder>
          <StreamPlaceHolderText>
            Привіт! <br />
            Наразі урок на цій сторінці не проводиться! Перевірте, чи ви перейшли за
            правильним посиланням або спробуйте пізніше.
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
                url={links.deutsch}
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

            <StudentInput
              isInputOpen={isQuizInputOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizInput}
              page={room.replace('/streams/', '')}
              currentUser={currentUser}
              user={user}
              questionID={questionID.current}
            />

            <StudentOptions
              isInputOpen={isQuizOptionsOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizOptions}
              page={room.replace('/streams/', '')}
              currentUser={currentUser}
              user={user}
              questionID={questionID.current}
            />

            <StudentTrueFalse
              isInputOpen={isQuizTrueFalseOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizTrueFalse}
              page={room.replace('/streams/', '')}
              currentUser={currentUser}
              user={user}
              questionID={questionID.current}
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

export default StreamDeutsch;
