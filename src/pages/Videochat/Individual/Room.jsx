import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  GradientBackground,
  JitsiContainer,
  LargeText,
  PageContainer,
} from '../Videochat.styled';
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
  const [isIframeOpen, setIsIframeOpen] = useState(true);

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
      setIsIframeOpen(true);

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
        setIsIframeOpen(true);
        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('participantRoleChanged', participant => {
      if (participant.role === 'moderator') {
        setIsIframeOpen(true);
        externalApi.pinParticipant(participant.id);
        setAdminId(participant.id);

        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('errorOccurred', error => {
      if (error.error.name === 'conference.authenticationRequired') {
        setIsIframeOpen(false);
        setisLoading(false);
      }
    });

    return () => {
      externalApi.removeAllListeners();
    };
  };

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
          width: '100%',
        }}
      >
        <PageContainer
          style={{
            width: '100%',
            height: isIframeOpen || isAdmin ? windowHeight : '100%',
          }}
        >
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
              height: isIframeOpen || isAdmin ? windowHeight : '0',
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
                constraints: {
                  video: {
                    height: {
                      ideal: isAdmin ? 1080 : 720,
                      max: 1080,
                      min: 480,
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
                defaultLanguage: supportedLanguages.includes(browserLanguage)
                  ? browserLanguage
                  : 'en',
                toolbarButtons: [
                  'camera',
                  'chat',
                  'closedcaptions',
                  'desktop',
                  'download',
                  'embedmeeting',
                  'etherpad',
                  'feedback',
                  'filmstrip',
                  'fullscreen',
                  'hangup',
                  'help',
                  'highlight',
                  'invite',
                  'linktosalesforce',
                  'livestreaming',
                  'microphone',
                  'noisesuppression',
                  'participants-pane',
                  'profile',
                  'raisehand',
                  'recording',
                  'security',
                  'select-background',
                  'settings',
                  'shareaudio',
                  'sharedvideo',
                  'shortcuts',
                  'stats',
                  'tileview',
                  'toggle-camera',
                  'videoquality',
                  'whiteboard',
                ],
                hideConferenceSubject: true,
                hideConferenceTimer: true,
                hideRecordingLabel: false,
                hideParticipantsStats: true,
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
        </PageContainer>
      </div>
    </>
  );
}

export default Room;
