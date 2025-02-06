import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useWebRTC, { LOCAL_VIDEO } from './utils/hooks/useWebRTC';
import {
  ButtonsContainer,
  ChatContainer,
  DisabledMicroIcon,
  MainVideoContainer,
  MainVideo,
  MediaButton,
  MediaButtonContainer,
  MediaOption,
  MediaSelector,
  PageContainer,
  UsersVideosContainer,
  UserVideo,
  VideochatContainer,
} from './Videochat.styled';

function VideochatRoom() {
  const { id: roomID } = useParams();
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

  useEffect(() => {
    const video = localDevices.filter(device => device.kind === 'videoinput');
    const audio = localDevices.filter(device => device.kind === 'audioinput');
    setAudioDevices(audio);
    setVideoDevices(video);
  }, [localDevices]);

  return (
    <PageContainer>
      <VideochatContainer>
        {clients
          .filter(({ role }) => role === 'admin')
          .map(({ clientId, isCameraEnabled, isMicroEnabled }) => {
            return (
              <MainVideoContainer key={clientId} id={clientId}>
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
                    <DisabledMicroIcon>Camera Disabled</DisabledMicroIcon>
                )}
                {(!isMicroEnabled ||
                  (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                    <DisabledMicroIcon>Micro Disabled</DisabledMicroIcon>
                )}

                <ButtonsContainer>
                  {localRole === 'admin' && (
                    <MediaButtonContainer>
                      <MediaButton onClick={muteAll}>Mute All</MediaButton>
                    </MediaButtonContainer>
                  )}
                  <MediaButtonContainer>
                    <MediaButton onClick={toggleMicrophone}>
                      Micro
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
                    <MediaButton onClick={toggleCamera}>Camera</MediaButton>
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
                </ButtonsContainer>
              </MainVideoContainer>
            );
          })}

        {clients.filter(({ role }) => true).length > 0 && (
          <UsersVideosContainer>
            <MediaButtonContainer $isPagintionButton={true}>
              <MediaButton>&lt;</MediaButton>
            </MediaButtonContainer>

            {clients
              .filter(({ role }) => role !== 'admin')
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
                    {(!isCameraEnabled ||
                      (clientId === LOCAL_VIDEO && !isLocalCameraEnabled)) && (
                      <DisabledMicroIcon />
                    )}
                    {(!isMicroEnabled ||
                      (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                      <DisabledMicroIcon />
                    )}
                  </UserVideo>
                );
              })}
            <UserVideo />
            <UserVideo />
            <UserVideo />

            <MediaButtonContainer $isPagintionButton={true}>
              <MediaButton>&gt;</MediaButton>
            </MediaButtonContainer>
          </UsersVideosContainer>
        )}
      </VideochatContainer>
      <ChatContainer>TODO: text chat</ChatContainer>
    </PageContainer>
  );
}

export default VideochatRoom;
