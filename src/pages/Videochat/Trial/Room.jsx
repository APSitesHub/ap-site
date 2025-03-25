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
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { io } from 'socket.io-client';
import { ChatVideo } from 'utils/Chat/ChatVideo';
import useWebRTC, { LOCAL_VIDEO } from '../utils/hooks/useWebRTC';
import {
  ArrowDown,
  ArrowUp,
  ButtonsContainer,
  CameraIcon,
  DisabledCameraIcon,
  DisabledMicroIcon,
  SoundIcon,
  DisabledSoundIcon,
  VolumeRange,
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
  LargeText,
  GradientBackground,
} from '../Videochat.styled';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';

const VISIBLE_USERS_COUNT = 4;
const debug = false;

function Room() {
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
    changeVisibility,
    muteAll,
    addMockClient,
    getClients,
    remoteStreams,
    mixedAudioStream,
    localMediaStream,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  } = useWebRTC(roomID);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [volume, setVolume] = useState(1);
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
  const [visibleClients, setVisibleClients] = useState([]);
  const [width, height] = useSize(document.body);

  const chatEl = useRef();
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);

  const currentUser = useMemo(
    () => ({
      username: localStorage.getItem('userName'),
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
    const audiooutput = localDevices.filter(device => device.kind === 'audiooutput');
    setAudioDevices(audio);
    setVideoDevices(video);
    setAudioOutputDevices(audiooutput);
  }, [localDevices]);

  const changePage = isUp => {
    if (isUp) {
      setPage(prevPage => prevPage - 1);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  const endCall = () => {
    if (localRole === 'admin') {
      navigate('../../videochat');
    } else {
      navigate('../../end-call');
    }
  };

  useEffect(() => {
    socketRef.current = io('https://ap-chat-server.onrender.com/');

    socketRef.current.on('connected', (connected, handshake) => {
      if (debug) {
        console.log(connected);
        console.log(handshake.time);
      }
    });

    const getMessages = async () => {
      if (debug) {
        console.log('get');
      }
      try {
        const dbMessages = await axios.get(
          `https://ap-chat-server.onrender.com/messages/room`,
          {
            params: {
              room: `/streams/${room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}`,
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
      if (debug) {
        console.log(id);
        console.log(data);
      }
      setMessages(messages => {
        messages[messages.findIndex(message => message.id === id)].isPinned =
          data.isPinned;
        return [...messages];
      });
    });

    socketRef.current.on('message:delete', async id => {
      if (debug) {
        console.log('delete fired');
      }
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
      if (debug) {
        console.log(id);
      }
      setMessages(
        messages => (messages = [...messages.filter(message => message.id !== id)])
      );
    });

    socketRef.current.on('user:banned', async (userID, userIP) => {
      if (debug) {
        console.log(userID);
        console.log(userIP);
      }
    });
    // open quizzes on event
    socketRef.current.on('question:input', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizInputOpen(true);
    });
    socketRef.current.on('question:options', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizOptionsOpen(true);
    });
    socketRef.current.on('question:trueFalse', data => {
      console.log(data.page);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizTrueFalseOpen(true);
    });

    // close quizzes on event
    socketRef.current.on('question:closeInput', data => {
      console.log(data);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizInputOpen(false);
    });
    socketRef.current.on('question:closeOptions', data => {
      console.log(data);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizOptionsOpen(false);
    });
    socketRef.current.on('question:closeTrueFalse', data => {
      console.log(data);
      data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1] &&
        setIsQuizTrueFalseOpen(false);
    });

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, [currentUser, room]);

  useEffect(() => {
    setVisibleClients(prevState => {
      const updatedVisibleClients = clients
        .filter(({ role }) => role !== 'admin')
        .slice(page, page + VISIBLE_USERS_COUNT);

      const newClients = updatedVisibleClients.filter(
        client => !prevState.some(prevClient => prevClient.clientId === client.clientId)
      );

      const removedClients = prevState.filter(
        client =>
          !updatedVisibleClients.some(
            updatedClient => updatedClient.clientId === client.clientId
          )
      );

      newClients.forEach(client => {
        changeVisibility(client, true);
      });

      removedClients.forEach(client => {
        changeVisibility(client, false);
      });

      return updatedVisibleClients;
    });
  }, [page, clients]);

  useEffect(() => {
    if (debug) {
      console.log('Streams Updated');
    }

    const mediaQuery = window.matchMedia('(max-width: 1024px)');

    function handleScreenResize(e) {
      if (e.matches) {
        hideVideos();
      } else {
        showVideos();
      }
    }

    if (mediaQuery.matches) {
      hideVideos();
    } else {
      showVideos();
    }

    mediaQuery.addEventListener('change', handleScreenResize);
    updateStreams();

    return () => {
      mediaQuery.removeEventListener('change', handleScreenResize);
    };
  }, [visibleClients]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = mixedAudioStream;
    }
  }, [mixedAudioStream, audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    changeAudioOutput(localStorage.getItem('default-audiooutput') || 'default');
  }, [audioRef.current]);

  const toggleVolumeInput = () => {
    const input = document.getElementById('volume-range');
    input.style.display = input.style.display === 'block' ? 'none' : 'block';
  };

  const changeAudioOutput = async deviceId => {
    if (audioRef.current?.setSinkId) {
      try {
        await audioRef.current.setSinkId(deviceId);
        localStorage.setItem('default-audiooutput', deviceId);
      } catch (error) {
        console.error('Change audiootput error:', error);
      }
    } else {
      console.warn('setSinkId not supported');
    }
  };

  const updateStreams = () => {
    const videoElements = document.querySelectorAll('[data-video]');

    videoElements.forEach(el => {
      try {
        if (el?.dataset?.id === LOCAL_VIDEO) {
          updateLocalStream(el);
        } else {
          updateRemoteStream(el);
        }
      } catch (error) {
        console.error('failed streams updated: ', error);
      }
    });
  };

  const updateLocalStream = el => {
    if (el.srcObject?.id !== localMediaStream.current?.id) {
      el.srcObject = localMediaStream.current;
    }
  };

  const updateRemoteStream = el => {
    if (
      el.srcObject?.id !==
      remoteStreams.find(stream => stream.peerID === el.dataset.id).remoteStream.id
    ) {
      el.srcObject = remoteStreams.find(
        stream => stream.peerID === el.dataset.id
      ).remoteStream;
    }
  };

  const hideVideos = () => {
    clients
      .filter(({ role }) => role !== 'admin')
      .forEach(client => {
        changeVisibility(client, false);
      });
  };

  const showVideos = () => {
    visibleClients.forEach(client => {
      changeVisibility(client, true);
    });
  };

  return (
    <>
      {clients.find(({ role }) => role === 'admin') ? (
        <>
          <PageContainer
            style={{
              width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
            }}
          >
            <audio autoPlay ref={audioRef} />
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
                          data-video="teacher"
                          data-id={clientId}
                          autoPlay
                          playsInline
                          muted={true}
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
                    <>
                      {debug && (
                        <>
                          <MediaButtonContainer>
                            <MediaButton onClick={updateStreams}>
                              Update Streams
                            </MediaButton>
                          </MediaButtonContainer>
                          <MediaButtonContainer>
                            <MediaButton onClick={getClients}>Get clients</MediaButton>
                          </MediaButtonContainer>
                          <MediaButtonContainer>
                            <MediaButton onClick={addMockClient}>Add client</MediaButton>
                          </MediaButtonContainer>
                        </>
                      )}
                      <MediaButtonContainer>
                        <MediaButton onClick={muteAll}>Mute All</MediaButton>
                      </MediaButtonContainer>
                    </>
                  )}
                  {debug && (
                    <>
                      <MediaButtonContainer>
                        <MediaButton onClick={hideVideos}>hideVideos</MediaButton>
                      </MediaButtonContainer>
                      <MediaButtonContainer>
                        <MediaButton onClick={showVideos}>showVideos</MediaButton>
                      </MediaButtonContainer>
                    </>
                  )}
                  <MediaButtonContainer style={{ position: 'relative' }}>
                    <div
                      id="volume-range"
                      style={{
                        display: 'none',
                        position: 'absolute',
                        bottom: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '5px',
                        paddingBottom: '10px',
                      }}
                    >
                      <VolumeRange
                        min="0"
                        max="1"
                        step={0.01}
                        value={volume}
                        onChange={e => setVolume(e.target.value)}
                      />
                    </div>
                    <MediaButton onClick={() => toggleVolumeInput()}>
                      {volume !== '0' ? <SoundIcon /> : <DisabledSoundIcon />}
                    </MediaButton>
                    <MediaSelector
                      name="audiooutput"
                      id="audiooutput"
                      onChange={e => changeAudioOutput(e.target.value)}
                    >
                      {audioOutputDevices.map(device => (
                        <MediaOption key={device.deviceId} value={device.deviceId}>
                          {device.label}
                        </MediaOption>
                      ))}
                    </MediaSelector>
                  </MediaButtonContainer>
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
                    <MediaButton onClick={endCall}>
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
                    {visibleClients.map(
                      ({ clientId, isMicroEnabled, isCameraEnabled }) => {
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
                              data-video="user"
                              data-id={clientId}
                              autoPlay
                              playsInline
                              muted={true}
                              style={{
                                objectFit: 'contain',
                                maxWidth: 'inherit',
                                maxHeight: 'inherit',
                              }}
                            />
                            {debug && (
                              <div style={{ position: 'absolute', color: 'white' }}>
                                {clientId}
                              </div>
                            )}
                            {(!isCameraEnabled ||
                              (clientId === LOCAL_VIDEO && !isLocalCameraEnabled)) && (
                              <DisabledCameraIcon $isAbsolute $isSmall />
                            )}
                            {(!isMicroEnabled ||
                              (clientId === LOCAL_VIDEO &&
                                !isLocalMicrophoneEnabled)) && (
                              <DisabledMicroIcon $isAbsolute $isSmall />
                            )}
                          </UserVideo>
                        );
                      }
                    )}
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

            {localRole !== 'admin' && (
              <>
                <StudentInput
                  isInputOpen={isQuizInputOpen}
                  socket={socketRef.current}
                  toggleQuiz={toggleQuizInput}
                  page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                  currentUser={currentUser}
                />

                <StudentOptions
                  isInputOpen={isQuizOptionsOpen}
                  socket={socketRef.current}
                  toggleQuiz={toggleQuizOptions}
                  page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                  currentUser={currentUser}
                />

                <StudentTrueFalse
                  isInputOpen={isQuizTrueFalseOpen}
                  socket={socketRef.current}
                  toggleQuiz={toggleQuizTrueFalse}
                  page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                  currentUser={currentUser}
                />
              </>
            )}
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
      ) : (
        <PageContainer>
          <GradientBackground>
            <LargeText>Викладача поки немає!</LargeText>
          </GradientBackground>
        </PageContainer>
      )}
    </>
  );
}

export default Room;
