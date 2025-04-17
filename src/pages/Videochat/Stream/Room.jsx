import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import useSize from '@react-hook/size';
import axios from 'axios';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { io } from 'socket.io-client';
import { isRoomAdmin } from '../utils/api/isRoomAdmin';
import { ChatVideo } from 'utils/Chat/ChatVideo';
import { StudentInput } from 'components/Stream/StudentInput/StudentInput';
import { StudentOptions } from 'components/Stream/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/Stream/StudentInput/StudentTrueFalse';
import { KahootsVideoChat } from 'components/Stream/Kahoots/KahootsVideoChat';
import { PageContainer } from '../Videochat.styled';
import {
  ButtonBox,
  ChatBox,
  ChatBtn,
  ChatLogo,
  KahootBtn,
  KahootLogo,
} from 'components/Stream/Stream.styled';

const debug = false;

const Room = () => {
  const { id: roomID } = useParams();

  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [localRole, setLocalRole] = useState('user');

  const socketRef = useRef(null);
  const chatEl = useRef();

  const [width, height] = useSize(document.body);
  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);

  const currentUser = useMemo(
    () => ({
      username: localStorage.getItem('userName') || 'User ' + Math.floor(Math.random() * 1000 + 1),
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

  const fetchRole = async () => {
    const res = await isRoomAdmin();

    setLocalRole(res ? 'admin' : 'user');
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
    fetchRole();
  }, []);

  return (
    <>
      <PageContainer
        style={{
          width: isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
        }}
      >
        <JitsiMeeting
          domain="videohost.ap.education"
          roomName={roomID}
          configOverwrite={{
            disableDeepLinking: true,
            startWithAudioMuted: true,
            // disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            // defaultLogoUrl: 'https://ap.education/assets/icon/LogoRevers.svg',
            // logoImageUrl: 'https://ap.education/assets/icon/LogoRevers.svg',
            // hideLogo: true,
            // toolbarButtons: [
            //   'camera',
            //   'fullscreen',
            //   'settings',
            //   'hangup',
            //   'microphone',
            //   'toggle-camera',
            //   'closedcaptions',
            // ],
          }}
          interfaceConfigOverwrite={{
            MOBILE_APP_PROMO: false,
          }}
          //   APP_NAME: 'APP_NAME',
          //   AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
          //   AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',

          //   /**
          //    * A UX mode where the last screen share participant is automatically
          //    * pinned. Valid values are the string "remote-only" so remote participants
          //    * get pinned but not local, otherwise any truthy value for all participants,
          //    * and any falsy value to disable the feature.
          //    *
          //    * Note: this mode is experimental and subject to breakage.
          //    */
          //   AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
          //   BRAND_WATERMARK_LINK: 'https://ap.education/assets/icon/LogoRevers.svg',

          //   CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables it

          //   DEFAULT_BACKGROUND: '#6671c4',
          //   DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://ap.education/assets/icon/LogoRevers.svg',

          //   DISABLE_DOMINANT_SPEAKER_INDICATOR: false,

          //   /**
          //    * If true, notifications regarding joining/leaving are no longer displayed.
          //    */
          //   DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,

          //   /**
          //    * If true, presence status: busy, calling, connected etc. is not displayed.
          //    */
          //   DISABLE_PRESENCE_STATUS: false,

          //   /**
          //    * Whether the speech to text transcription subtitles panel is disabled.
          //    * If {@code undefined}, defaults to {@code false}.
          //    *
          //    * @type {boolean}
          //    */
          //   DISABLE_TRANSCRIPTION_SUBTITLES: true,

          //   /**
          //    * Whether or not the blurred video background for large video should be
          //    * displayed on browsers that can support it.
          //    */
          //   DISABLE_VIDEO_BACKGROUND: false,

          //   DISPLAY_WELCOME_FOOTER: true,
          //   DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
          //   DISPLAY_WELCOME_PAGE_CONTENT: true,
          //   DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: true,

          //   ENABLE_DIAL_OUT: true,

          //   FILM_STRIP_MAX_HEIGHT: 120,

          //   GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,

          //   /**
          //    * Hide the invite prompt in the header when alone in the meeting.
          //    */
          //   HIDE_INVITE_MORE_HEADER: true,

          //   JITSI_WATERMARK_LINK: 'https://google.com',

          //   LANG_DETECTION: true, // Allow i18n to detect the system language
          //   LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9

          //   /**
          //    * Maximum coefficient of the ratio of the large video to the visible area
          //    * after the large video is scaled to fit the window.
          //    *
          //    * @type {number}
          //    */
          //   MAXIMUM_ZOOMING_COEFFICIENT: 1.3,

          //   /**
          //    * Whether the mobile app Jitsi Meet is to be promoted to participants
          //    * attempting to join a conference in a mobile Web browser. If
          //    * {@code undefined}, defaults to {@code true}.
          //    *
          //    * @type {boolean}
          //    */
          //   MOBILE_APP_PROMO: true,

          //   // Names of browsers which should show a warning stating the current browser
          //   // has a suboptimal experience. Browsers which are not listed as optimal or
          //   // unsupported are considered suboptimal. Valid values are:
          //   // chrome, chromium, electron, firefox , safari, webkit
          //   OPTIMAL_BROWSERS: [
          //     'chrome',
          //     'chromium',
          //     'firefox',
          //     'electron',
          //     'safari',
          //     'webkit',
          //   ],

          //   POLICY_LOGO: 'https://ap.education/assets/icon/LogoRevers.svg',
          //   PROVIDER_NAME: 'AP Education',

          //   /**
          //    * If true, will display recent list
          //    *
          //    * @type {boolean}
          //    */
          //   RECENT_LIST_ENABLED: true,
          //   REMOTE_THUMBNAIL_RATIO: 1, // 1:1

          //   SETTINGS_SECTIONS: [
          //     'devices',
          //     'language',
          //     'moderator',
          //     'profile',
          //     'calendar',
          //     'sounds',
          //     'more',
          //   ],

          //   /**
          //    * Specify which sharing features should be displayed. If the value is not set
          //    * all sharing features will be shown. You can set [] to disable all.
          //    */
          //   // SHARING_FEATURES: ['email', 'url', 'dial-in', 'embed'],

          //   SHOW_BRAND_WATERMARK: false,

          //   /**
          //    * Decides whether the chrome extension banner should be rendered on the landing page and during the meeting.
          //    * If this is set to false, the banner will not be rendered at all. If set to true, the check for extension(s)
          //    * being already installed is done before rendering.
          //    */
          //   SHOW_CHROME_EXTENSION_BANNER: false,

          //   SHOW_JITSI_WATERMARK: false,
          //   SHOW_POWERED_BY: false,
          //   SHOW_PROMOTIONAL_CLOSE_PAGE: false,

          //   /*
          //    * If indicated some of the error dialogs may point to the support URL for
          //    * help.
          //    */
          //   SUPPORT_URL: 'https://community.jitsi.org/',

          //   // Browsers, in addition to those which do not fully support WebRTC, that
          //   // are not supported and should show the unsupported browser page.
          //   UNSUPPORTED_BROWSERS: [],

          //   /**
          //    * Whether to show thumbnails in filmstrip as a column instead of as a row.
          //    */
          //   VERTICAL_FILMSTRIP: true,

          //   // Determines how the video would fit the screen. 'both' would fit the whole
          //   // screen, 'height' would fit the original video height to the height of the
          //   // screen, 'width' would fit the original video width to the width of the
          //   // screen respecting ratio, 'nocrop' would make the video as large as
          //   // possible and preserve aspect ratio without cropping.
          //   VIDEO_LAYOUT_FIT: 'both',

          //   /**
          //    * If true, hides the video quality label indicating the resolution status
          //    * of the current large video.
          //    *
          //    * @type {boolean}
          //    */
          //   VIDEO_QUALITY_LABEL_DISABLED: false,
          // }}
          getIFrameRef={iframeRef => {
            iframeRef.style.height = '100%';
            iframeRef.style.width = '100%';
          }}
        />
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
  );
};

export default Room;
