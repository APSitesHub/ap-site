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
import { PageContainer } from '../Videochat.styled';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';
import { JitsiMeeting } from '@jitsi/react-sdk';

const debug = true;

function Room({ isAdmin }) {
  const navigate = useNavigate();
  const { id: roomID } = useParams();
  // const lang = roomID === '446390d3-10c9-47f4-8880-8d9043219ccd' ? 'pl' : 'ua';
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [width, height] = useSize(document.body);

  const chatEl = useRef();
  const socketRef = useRef(null);

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

  return (
    <>
      <div
        style={{
          transform: isAdmin && !debug ? 'scale(1, -1)' : 'none',
          overflow: 'hidden',
        }}
      >
        <PageContainer
          style={{
            width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
          }}
        >
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

          <JitsiMeeting
            domain="videohost.ap.education"
            roomName={roomID}
            configOverwrite={{
              startWithVideoMuted: !isAdmin,
              followMeEnabled: isAdmin,
              disableDeepLinking: true,
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              disableReactions: true,
              startScreenSharing: false,
              enableEmailInStats: false,
              disableSelfViewSettings: true,
              constraints: {
                video: {
                  height: {
                    ideal: 1080,
                    max: 1080,
                    min: 240,
                  },
                },
              },
              prejoinConfig: {
                enabled: true,
                hideDisplayName: false,
                // hideExtraJoinButtons: ['no-audio', 'by-phone'],
                preCallTestEnabled: true,
                preCallTestICEUrl: '',
              },
              readOnlyName: true,
              defaultLanguage: navigator.language.split('-')[0],
              toolbarButtons: [
                'camera',
                // 'chat',
                // 'closedcaptions',
                // 'desktop',
                // 'download',
                // 'embedmeeting',
                // 'etherpad',
                // 'feedback',
                'filmstrip',
                'fullscreen',
                'hangup',
                // 'help',
                // 'highlight',
                // 'invite',
                // 'linktosalesforce',
                // 'livestreaming',
                'microphone',
                // 'noisesuppression',
                'participants-pane',
                // 'profile',
                'raisehand',
                // 'recording',
                // 'security',
                'select-background',
                'settings',
                // 'shareaudio',
                // 'sharedvideo',
                // 'shortcuts',
                // 'stats',
                // 'tileview',
                'toggle-camera',
                'videoquality',
                // 'whiteboard',
              ],
              disabledSounds: [
                'ASKED_TO_UNMUTE_SOUND',
                'E2EE_OFF_SOUND',
                'E2EE_ON_SOUND',
                'INCOMING_MSG_SOUND',
                'KNOCKING_PARTICIPANT_SOUND',
                'LIVE_STREAMING_OFF_SOUND',
                'LIVE_STREAMING_ON_SOUND',
                'NO_AUDIO_SIGNAL_SOUND',
                'NOISY_AUDIO_INPUT_SOUND',
                'OUTGOING_CALL_EXPIRED_SOUND',
                'OUTGOING_CALL_REJECTED_SOUND',
                'OUTGOING_CALL_RINGING_SOUND',
                'OUTGOING_CALL_START_SOUND',
                'PARTICIPANT_JOINED_SOUND',
                'PARTICIPANT_LEFT_SOUND',
                'RAISE_HAND_SOUND',
                'REACTION_SOUND',
                'RECORDING_OFF_SOUND',
                'RECORDING_ON_SOUND',
                'TALK_WHILE_MUTED_SOUND',
              ],
              hideConferenceSubject: true,
              hideConferenceTimer: true,
              hideRecordingLabel: false,
              hideParticipantsStats: true,
              notifications: [],
            }}
            interfaceConfigOverwrite={{
              MOBILE_APP_PROMO: false,
              SETTINGS_SECTIONS: ['devices', 'more', 'language', 'moderator'],
              SHOW_CHROME_EXTENSION_BANNER: false,
            }}
            userInfo={{
              displayName: localStorage.getItem('userName'),
            }}
            getIFrameRef={iframeRef => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
            }}
            onReadyToClose={() => {
              isAdmin ? navigate('../../videochat') : navigate('../../end-call');
            }}
          />

          {!isAdmin && (
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
      </div>
    </>
  );
}

export default Room;
