import useSize from '@react-hook/size';
import axios from 'axios';
import { KahootsVideoChat } from 'components/Stream/Kahoots/KahootsVideoChat';
import {
  ButtonBox,
  ChatBox,
  ChatBtn,
  ChatLogo,
  KahootBtn,
  KahootLogo,
} from 'components/Stream/Stream.styled';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { io } from 'socket.io-client';
import { ChatVideo } from 'utils/Chat/ChatVideo';
import useWebRTC, { LOCAL_VIDEO } from './utils/hooks/useWebRTC';
import {
  ArrowDown,
  ArrowUp,
  ButtonsContainer,
  CameraIcon,
  DisabledCameraIcon,
  DisabledMicroIcon,
  EndCallIcon,
  MainVideo,
  MainVideoContainer,
  MediaButton,
  MediaButtonContainer,
  MediaOption,
  MediaSelector,
  MicroIcon,
  PageContainer,
  SideContainer,
  UsersVideosContainer,
  UserVideo,
  VideochatContainer,
} from './Videochat.styled';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';

const VISIBLE_USERS_COUNT = 4;

function VideochatRoom() {
  const { id: roomID } = useParams();
  const navigate = useNavigate();
  const {
    clients,
    provideMediaRef,
    localRole,
    localDevices,
    toggleCamera,
    toggleMicrophone,
    changeCamera,
    changeMicrophone,
    muteAll,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  } = useWebRTC(roomID);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [width, height] = useSize(document.body);

  const chatEl = useRef();
  const socketRef = useRef(null);

  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);

  const currentUser = useMemo(
    () => ({
      username: 'User ' + nanoid(4),
      isBanned: false,
      userIP: 'no ip',
    }),
    []
  );
  let location = useLocation();

  const videoBoxWidth =
    chatWidth === 0 && width > height ? width - 300 : width - chatWidth;

  const room = location.pathname;

  const toggleKahoot = e => {
    setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isChatOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };

  const toggleChat = () => {
    setIsChatOpen(isChatOpen => !isChatOpen);
    isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'chat')
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

  useEffect(() => {
    const video = localDevices.filter(device => device.kind === 'videoinput');
    const audio = localDevices.filter(device => device.kind === 'audioinput');
    setAudioDevices(audio);
    setVideoDevices(video);
  }, [localDevices]);

  const changePage = isUp => {
    if (isUp) {
      setPage(prevPage => prevPage - 1);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('userName')) {
      localStorage.setItem('userName', currentUser.username);
      localStorage.setItem('userID', currentUser.username.slice(5));
    }

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
    });

    // open quizzes on event
    socketRef.current.on('question:input', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizInputOpen(true);
    });
    socketRef.current.on('question:options', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizOptionsOpen(true);
    });
    socketRef.current.on('question:trueFalse', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizTrueFalseOpen(true);
    });

    // close quizzes on event
    socketRef.current.on('question:closeInput', data => {
      console.log(data);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizInputOpen(false);
    });
    socketRef.current.on('question:closeOptions', data => {
      console.log(data);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizOptionsOpen(false);
    });
    socketRef.current.on('question:closeTrueFalse', data => {
      console.log(data);
      data.page === room.match(/\/room\/([^]+)\/[^]+$/)[1] && setIsQuizTrueFalseOpen(false);
    });

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, [currentUser, room]);

  return (
    <>
      <PageContainer
        style={{
          width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
        }}
      >
        <VideochatContainer>
          <MainVideoContainer>
            {clients
              .filter(({ role }) => role === 'admin')
              .map(({ clientId, isCameraEnabled, isMicroEnabled }) => {
                return (
                  <div
                    style={{ height: '100%', width: '100%' }}
                    id={clientId}
                    key={clientId}
                  >
                    <MainVideo
                      ref={instance => {
                        provideMediaRef(clientId, instance);
                      }}
                      autoPlay
                      playsInline
                      muted={clientId === LOCAL_VIDEO}
                    />
                    {(!isCameraEnabled ||
                      (clientId === LOCAL_VIDEO && !isLocalCameraEnabled)) && (
                      <DisabledCameraIcon $isAbsolute />
                    )}
                    {(!isMicroEnabled ||
                      (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                      <DisabledMicroIcon $isAbsolute />
                    )}
                  </div>
                );
              })}
            <ButtonsContainer>
              {localRole === 'admin' && (
                <MediaButtonContainer>
                  <MediaButton onClick={muteAll}>Mute All</MediaButton>
                </MediaButtonContainer>
              )}
              <MediaButtonContainer>
                <MediaButton onClick={toggleMicrophone}>
                  {isLocalMicrophoneEnabled ? <MicroIcon /> : <DisabledMicroIcon />}
                </MediaButton>
                <MediaSelector
                  name="micro"
                  id="micro"
                  onChange={e => changeMicrophone(e.target.value)}
                >
                  {audioDevices.map(device => (
                    <MediaOption key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </MediaOption>
                  ))}
                </MediaSelector>
              </MediaButtonContainer>
              <MediaButtonContainer>
                <MediaButton onClick={toggleCamera}>
                  {isLocalCameraEnabled ? <CameraIcon /> : <DisabledCameraIcon />}
                </MediaButton>
                <MediaSelector
                  name="camera"
                  id="camera"
                  onChange={e => changeCamera(e.target.value)}
                >
                  {videoDevices.map(device => (
                    <MediaOption key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </MediaOption>
                  ))}
                </MediaSelector>
              </MediaButtonContainer>
              <MediaButtonContainer $isRed>
                <MediaButton
                  onClick={() => {
                    navigate('../../videochat');
                  }}
                >
                  <EndCallIcon />
                </MediaButton>
              </MediaButtonContainer>
            </ButtonsContainer>
          </MainVideoContainer>

          {clients.filter(({ role }) => role !== 'admin').length > 0 && (
            <SideContainer>
              <MediaButtonContainer $isPagintionButton>
                <MediaButton onClick={() => changePage(true)} disabled={page === 0}>
                  <ArrowUp />
                </MediaButton>
              </MediaButtonContainer>
              <UsersVideosContainer>
                {clients
                  .filter(({ role }) => role !== 'admin')
                  .slice(page, page + VISIBLE_USERS_COUNT)
                  .map(({ clientId, isMicroEnabled, isCameraEnabled }) => {
                    return (
                      <UserVideo
                        key={clientId}
                        id={clientId}
                        $isUserVideo={clientId === LOCAL_VIDEO}
                      >
                        <video
                          width="100%"
                          height="100%"
                          ref={instance => {
                            provideMediaRef(clientId, instance);
                          }}
                          autoPlay
                          playsInline
                          muted={clientId === LOCAL_VIDEO}
                        />
                        {/* <div style={{ position: 'absolute', color: 'white' }}>
                        {clientId}
                      </div> */}
                        {(!isCameraEnabled ||
                          (clientId === LOCAL_VIDEO && !isLocalCameraEnabled)) && (
                          <DisabledCameraIcon $isAbsolute $isSmall />
                        )}
                        {(!isMicroEnabled ||
                          (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                          <DisabledMicroIcon $isAbsolute $isSmall />
                        )}
                      </UserVideo>
                    );
                  })}
              </UsersVideosContainer>
              <MediaButtonContainer $isPagintionButton>
                <MediaButton
                  onClick={() => changePage(false)}
                  disabled={page + VISIBLE_USERS_COUNT >= clients.length - 1}
                >
                  <ArrowDown />
                </MediaButton>
              </MediaButtonContainer>
            </SideContainer>
          )}
        </VideochatContainer>
        <ButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
          <KahootBtn onClick={toggleKahoot}>
            <KahootLogo />
          </KahootBtn>
          <ChatBtn onClick={toggleChat}>
            <ChatLogo />
          </ChatBtn>
        </ButtonBox>
        <KahootsVideoChat
          sectionWidth={width}
          sectionHeight={height}
          isKahootOpen={isKahootOpen}
          isChatOpen={isChatOpen}
          isOpenedLast={isOpenedLast}
        />

        <StudentInput
          isInputOpen={isQuizInputOpen}
          socket={socketRef.current}
          toggleInput={toggleQuizInput}
          page={room.match(/\/room\/([^]+)\/[^]+$/)[1]}
        />

        <StudentOptions
          isInputOpen={isQuizOptionsOpen}
          socket={socketRef.current}
          toggleInput={toggleQuizOptions}
          page={room.match(/\/room\/([^]+)\/[^]+$/)[1]}
        />

        <StudentTrueFalse
          isInputOpen={isQuizTrueFalseOpen}
          socket={socketRef.current}
          toggleInput={toggleQuizTrueFalse}
          page={room.match(/\/room\/([^]+)\/[^]+$/)[1]}
        />

        {/* <KahootsVideo
        sectionWidth={width}
        sectionHeight={height}
        isKahootOpen={isKahootOpen}
        isChatOpen={isChatOpen}
        isOpenedLast={isOpenedLast}
        activeKahoot={activeKahoot}
      /> */}
      </PageContainer>
      <ChatBox
        ref={chatEl}
        className={isChatOpen ? 'shown' : 'hidden'}
        style={isOpenedLast === 'chat' ? { zIndex: '2' } : { zIndex: '1' }}
      >
        <ChatVideo
          socket={socketRef.current}
          messages={messages}
          isChatOpen={isChatOpen}
          currentUser={currentUser}
        />
      </ChatBox>
    </>
  );
}

export default VideochatRoom;
