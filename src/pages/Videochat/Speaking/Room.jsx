import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  GradientBackground,
  JitsiContainer,
  LargeText,
  PageContainer,
} from '../Videochat.styled';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { ColorRing } from 'react-loader-spinner';

const browserLanguage = navigator.language.split('-')[0];
const debug = true;

function Room({ isAdmin, roomId }) {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isConferenceStarted, setIsConferenceStarted] = useState(false);

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
      }
    });

    externalApi.addListener('participantRoleChanged', participant => {
      if (participant.role === 'moderator') {
        setIsConferenceStarted(true);
        externalApi.pinParticipant(participant.id);
        setAdminId(participant.id);
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
        navigate('../../end-call');
      } else {
        window.location.reload();
      }
    });

    return () => {
      externalApi.removeAllListeners();
    };
  };

  return (
    <>
      <div
        style={{
          transform: isAdmin && !debug ? 'scale(1, -1)' : 'none',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
        }}
      >
        <PageContainer
          style={{
            width: '100%',
            height: '100%',
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
                <LargeText>{'Завантаження'}</LargeText>
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
              <LargeText>Викладача поки немає!</LargeText>
            )}
          </GradientBackground>
          <JitsiContainer
            style={{
              height: '100%',
            }}
          >
            <JitsiMeeting
              key={roomId}
              domain="dev2.ap.education"
              roomName={roomId}
              configOverwrite={{
                disableTileEnlargement: true,
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
                      min: 480,
                    },
                  },
                },
                p2p: {
                  enabled: false,
                },
                prejoinConfig: {
                  enabled: true,
                  hideDisplayName: false,
                  // hideExtraJoinButtons: ['no-audio', 'by-phone'],
                  preCallTestEnabled: true,
                  preCallTestICEUrl: '',
                },
                readOnlyName: true,
                defaultLanguage: browserLanguage,
                toolbarButtons: [
                  'camera',
                  'chat',
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
                  'dialog.cameraNotSendingData', // shown when there's no feed from user's camera
                  'dialog.kickTitle', // shown when user has been kicked
                  'dialog.liveStreaming', // livestreaming notifications (pending, on, off, limits)
                  'dialog.lockTitle', // shown when setting conference password fails
                  'dialog.maxUsersLimitReached', // shown when maximmum users limit has been reached
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
                isAdmin ? navigate('../../videochat') : navigate('../../end-call');
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
