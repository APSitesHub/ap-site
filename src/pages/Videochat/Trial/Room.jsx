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
import {
  FullScreenIcon,
  GradientBackground,
  JitsiContainer,
  LargeText,
  PageContainer,
} from '../Videochat.styled';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { ColorRing } from 'react-loader-spinner';

const supportedLanguages = ['uk', 'en', 'pl', 'de'];
const browserLanguage = navigator.language.split('-')[0];

const debug = true;

function Room({ isAdmin, lang }) {
  const navigate = useNavigate();
  const { id: roomID } = useParams();
  const [isConnected, setIsConnected] = useState(false);
  const [scrollOn, setScrollOn] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [adminId, setAdminId] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isConferenceStarted, setIsConferenceStarted] = useState(false);
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
  const questionID = useRef('');

  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);

  const currentUser = useMemo(
    () => ({
      username: localStorage.getItem('userName'),
      isBanned: false,
      userIP: 'no ip',
      userID: localStorage.getItem('userID'),
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

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
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

  const findTeacherId = participants => {
    for (const id in participants) {
      if (participants[id].displayName.endsWith('(teacher)')) {
        return id;
      }
    }
    return null;
  };

  const handleApiReady = async externalApi => {
    const participants = await externalApi.getParticipantsInfo();

    participants.find(participant => participant.name.endsWith('(teacher)')) &&
      setIsConferenceStarted(true);

    externalApi.addListener('participantJoined', participant => {
      if (!adminId) {
        const fidedAdminId = findTeacherId(externalApi._participants);
        setAdminId(() => {
          externalApi.pinParticipant(fidedAdminId);
          setAdminId(fidedAdminId);

          return fidedAdminId;
        });
      }

      if (participant.displayName.endsWith('(teacher)')) {
        setIsConferenceStarted(true);
        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('participantRoleChanged', participant => {
      if (participant.role === 'moderator') {
        setIsConferenceStarted(true);
        externalApi.pinParticipant(participant.id);
        setAdminId(participant.id);

        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('errorOccurred', error => {
      if (error.error.name === 'conference.authenticationRequired') {
        setIsConferenceStarted(false);
        setisLoading(false);
      }
    });

    externalApi.addEventListener('videoConferenceLeft', () => {
      if (isConferenceStarted) {
        navigate(lang === 'pl' ? '../../end-call-pl' : '../../end-call');
      } else {
        window.location.reload();
      }
    });

    return () => {
      externalApi.removeAllListeners();
    };
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
      console.log(data);

      if (data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]) {
        setIsQuizInputOpen(true);
        questionID.current = data.question;
      }
    });
    socketRef.current.on('question:options', data => {
      if (data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]) {
        setIsQuizOptionsOpen(true);
        questionID.current = data.question;
      }
    });
    socketRef.current.on('question:trueFalse', data => {
      if (data.page === room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]) {
        setIsQuizTrueFalseOpen(true);
        questionID.current = data.question;
      }
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
    const setAppHeight = () => {
      if (window.innerHeight < 400 && !isConnected) {
        setWindowHeight(400);
        setScrollOn(true);
      } else {
        setWindowHeight(window.innerHeight);
        setScrollOn(false);
      }
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);

    return () => window.removeEventListener('resize', setAppHeight);
  }, [isConnected]);

  return (
    <>
      <div
        style={{
          transform: isAdmin && !debug ? 'scale(1, -1)' : 'none',
          overflow: scrollOn ? 'scroll' : 'hidden',
          height: '100%',
        }}
      >
        <PageContainer
          style={{
            width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
            height: '100%',
          }}
        >
          <ButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
            <KahootBtn onClick={toggleKahoot}>
              <KahootLogo />
            </KahootBtn>
            <ChatBtn onClick={toggleChat}>
              <ChatLogo />
            </ChatBtn>
            <KahootBtn onClick={toggleFullScreen}>
              <FullScreenIcon />
            </KahootBtn>
          </ButtonBox>
          <KahootsVideoChat
            sectionWidth={width}
            sectionHeight={height}
            isKahootOpen={isKahootOpen}
            isChatOpen={isChatOpen}
            isOpenedLast={isOpenedLast}
            lang={lang}
          />

          <GradientBackground>
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <LargeText>{lang === 'pl' ? 'Loading' : 'Завантаження'}</LargeText>
                <ColorRing
                  visible={true}
                  height="120"
                  width="120"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              </div>
            ) : (
              <LargeText>
                {lang === 'pl'
                  ? 'Nauczyciel jeszcze nie przyszedł!'
                  : 'Викладача поки немає!'}
              </LargeText>
            )}
          </GradientBackground>
          <JitsiContainer
            style={{
              height: windowHeight,
            }}
          >
            <JitsiMeeting
              domain="videohost.ap.education"
              roomName={roomID}
              configOverwrite={{
                disableTileEnlargement: true,
                startWithVideoMuted: !isAdmin,
                followMeEnabled: isAdmin,
                disableDeepLinking: true,
                startWithAudioMuted: true,
                disableInitialGUM: !isAdmin,
                disableModeratorIndicator: true,
                disableReactions: true,
                startScreenSharing: false,
                enableEmailInStats: false,
                disableSelfViewSettings: true,
                channelLastN: 3,
                enableOpusRed: true,
                constraints: {
                  video: {
                    height: {
                      ideal: 720,
                      max: 720,
                      min: 180,
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
                defaultLanguage:
                  lang === 'pl'
                    ? 'pl'
                    : supportedLanguages.includes(browserLanguage)
                    ? browserLanguage
                    : 'en',
                toolbarButtons: [
                  'camera',
                  // 'chat',
                  // 'closedcaptions',
                  'desktop',
                  // 'download',
                  // 'embedmeeting',
                  // 'etherpad',
                  // 'feedback',
                  'filmstrip',
                  // 'fullscreen',
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
                  'shareaudio',
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
                disabledNotifications: [
                  'connection.CONNFAIL', // shown when the connection fails,
                  'dialog.cameraConstraintFailedError', // shown when the camera failed
                  'dialog.cameraNotSendingData', // shown when there's no feed from user's camera
                  'dialog.kickTitle', // shown when user has been kicked
                  'dialog.liveStreaming', // livestreaming notifications (pending, on, off, limits)
                  'dialog.lockTitle', // shown when setting conference password fails
                  'dialog.maxUsersLimitReached', // shown when maximmum users limit has been reached
                  'dialog.micNotSendingData', // shown when user's mic is not sending any audio
                  'dialog.passwordNotSupportedTitle', // shown when setting conference password fails due to password format
                  'dialog.recording', // recording notifications (pending, on, off, limits)
                  'dialog.remoteControlTitle', // remote control notifications (allowed, denied, start, stop, error)
                  'dialog.reservationError',
                  'dialog.screenSharingFailedTitle', // shown when the screen sharing failed
                  'dialog.serviceUnavailable', // shown when server is not reachable
                  'dialog.sessTerminated', // shown when there is a failed conference session
                  'dialog.sessionRestarted', // show when a client reload is initiated because of bridge migration
                  'dialog.tokenAuthFailed', // show when an invalid jwt is used
                  'dialog.tokenAuthFailedWithReasons', // show when an invalid jwt is used with the reason behind the error
                  'dialog.transcribing', // transcribing notifications (pending, off)
                  'dialOut.statusMessage', // shown when dial out status is updated.
                  'liveStreaming.busy', // shown when livestreaming service is busy
                  'liveStreaming.failedToStart', // shown when livestreaming fails to start
                  'liveStreaming.unavailableTitle', // shown when livestreaming service is not reachable
                  'lobby.joinRejectedMessage', // shown when while in a lobby, user's request to join is rejected
                  'lobby.notificationTitle', // shown when lobby is toggled and when join requests are allowed / denied
                  'notify.audioUnmuteBlockedTitle', // shown when mic unmute blocked
                  'notify.chatMessages', // shown when receiving chat messages while the chat window is closed
                  'notify.connectedOneMember', // show when a participant joined
                  'notify.connectedThreePlusMembers', // show when more than 2 participants joined simultaneously
                  'notify.connectedTwoMembers', // show when two participants joined simultaneously
                  'notify.dataChannelClosed', // shown when the bridge channel has been disconnected
                  'notify.hostAskedUnmute', // shown to participant when host asks them to unmute
                  'notify.invitedOneMember', // shown when 1 participant has been invited
                  'notify.invitedThreePlusMembers', // shown when 3+ participants have been invited
                  'notify.invitedTwoMembers', // shown when 2 participants have been invited
                  'notify.kickParticipant', // shown when a participant is kicked
                  'notify.leftOneMember', // show when a participant left
                  'notify.leftThreePlusMembers', // show when more than 2 participants left simultaneously
                  'notify.leftTwoMembers', // show when two participants left simultaneously
                  'notify.linkToSalesforce', // shown when joining a meeting with salesforce integration
                  'notify.localRecordingStarted', // shown when the local recording has been started
                  'notify.localRecordingStopped', // shown when the local recording has been stopped
                  'notify.moderationInEffectCSTitle', // shown when user attempts to share content during AV moderation
                  'notify.moderationInEffectTitle', // shown when user attempts to unmute audio during AV moderation
                  'notify.moderationInEffectVideoTitle', // shown when user attempts to enable video during AV moderation
                  'notify.moderator', // shown when user gets moderator privilege
                  'notify.mutedRemotelyTitle', // shown when user is muted by a remote party
                  'notify.mutedTitle', // shown when user has been muted upon joining,
                  'notify.newDeviceAudioTitle', // prompts the user to use a newly detected audio device
                  'notify.newDeviceCameraTitle', // prompts the user to use a newly detected camera
                  'notify.noiseSuppressionFailedTitle', // shown when failed to start noise suppression
                  'notify.participantWantsToJoin', // shown when lobby is enabled and participant requests to join meeting
                  'notify.participantsWantToJoin', // shown when lobby is enabled and participants request to join meeting
                  'notify.passwordRemovedRemotely', // shown when a password has been removed remotely
                  'notify.passwordSetRemotely', // shown when a password has been set remotely
                  'notify.raisedHand', // shown when a participant used raise hand,
                  'notify.screenShareNoAudio', // shown when the audio could not be shared for the selected screen
                  'notify.screenSharingAudioOnlyTitle', // shown when the best performance has been affected by screen sharing
                  'notify.selfViewTitle', // show "You can always un-hide the self-view from settings"
                  'notify.startSilentTitle', // shown when user joined with no audio
                  'notify.suboptimalExperienceTitle', // show the browser warning
                  'notify.unmute', // shown to moderator when user raises hand during AV moderation
                  'notify.videoMutedRemotelyTitle', // shown when user's video is muted by a remote party,
                  'notify.videoUnmuteBlockedTitle', // shown when camera unmute and desktop sharing are blocked
                  'prejoin.errorDialOut',
                  'prejoin.errorDialOutDisconnected',
                  'prejoin.errorDialOutFailed',
                  'prejoin.errorDialOutStatus',
                  'prejoin.errorStatusCode',
                  'prejoin.errorValidation',
                  'recording.busy', // shown when recording service is busy
                  'recording.failedToStart', // shown when recording fails to start
                  'recording.unavailableTitle', // shown when recording service is not reachable
                  'toolbar.noAudioSignalTitle', // shown when a broken mic is detected
                  'toolbar.noisyAudioInputTitle', // shown when noise is detected for the current microphone
                  'toolbar.talkWhileMutedPopup', // shown when user tries to speak while muted
                  'transcribing.failed', // shown when transcribing fails
                ],
              }}
              interfaceConfigOverwrite={{
                MOBILE_APP_PROMO: false,
                MAXIMUM_ZOOMING_COEFFICIENT: 1,
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
                isAdmin
                  ? navigate('../../videochat')
                  : navigate(lang === 'pl' ? '../../end-call-pl' : '../../end-call');
              }}
              onApiReady={handleApiReady}
            />
          </JitsiContainer>

          {!isAdmin && (
            <>
              <StudentInput
                isInputOpen={isQuizInputOpen}
                socket={socketRef.current}
                toggleQuiz={toggleQuizInput}
                page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                currentUser={currentUser}
                questionID={questionID.current}
              />

              <StudentOptions
                isInputOpen={isQuizOptionsOpen}
                socket={socketRef.current}
                toggleQuiz={toggleQuizOptions}
                page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                currentUser={currentUser}
                questionID={questionID.current}
              />

              <StudentTrueFalse
                isInputOpen={isQuizTrueFalseOpen}
                socket={socketRef.current}
                toggleQuiz={toggleQuizTrueFalse}
                page={room.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1]}
                currentUser={currentUser}
                questionID={questionID.current}
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
            lang={lang}
          />
        </ChatBox>
      </div>
    </>
  );
}

export default Room;
