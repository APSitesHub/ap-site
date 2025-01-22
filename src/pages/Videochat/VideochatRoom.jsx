import { useParams } from 'react-router';
import useWebRTC, { LOCAL_VIDEO } from './utils/hooks/useWebRTC';
import { useEffect, useState } from 'react';
import {
  MainVideo,
  PageContainer,
  UsersVideosContainer,
  UserVideo,
  VideochatContainer,
  ChatContainer,
  ButtonsContainer,
  MediaButtonContainer,
  MediaButton,
  MediaSelector,
  MediaOption,
  DisabledMicroIcon,
} from './Videochat.styled';

function VideochatRoom() {
  const { id: roomID } = useParams();
  const {
    clients,
    provideMediaRef,
    localDevices,
    toggleCamera,
    toggleMicrophone,
    changeCamera,
    changeMicrophone,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  } = useWebRTC(roomID);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);

  useEffect(() => {
    const video = localDevices.filter(device => device.kind === 'videoinput');
    const audio = localDevices.filter(device => device.kind === 'audioinput');
    setAudioDevices(audio);
    setVideoDevices(video);
  }, [localDevices]);

  return (
    <PageContainer>
      <VideochatContainer>
        <UsersVideosContainer>
          {clients
            .filter(({ role }) => role !== 'admin')
            .map(({ clientId, isMicroEnabled, isCameraEnabled }) => {
              return (
                <UserVideo key={clientId} id={clientId}>
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
                  {!isCameraEnabled && (
                    <DisabledMicroIcon>Camera Disabled</DisabledMicroIcon>
                  )}
                  {!isMicroEnabled && (
                    <DisabledMicroIcon>Micro Disabled</DisabledMicroIcon>
                  )}
                </UserVideo>
              );
            })}
          <UserVideo />
          <UserVideo />
          <UserVideo />
          <UserVideo />
          <UserVideo />
          <UserVideo />
          <UserVideo />
        </UsersVideosContainer>
        {clients
          .filter(({ role }) => role === 'admin')
          .map(({ clientId }) => {
            return (
              <MainVideo key={clientId} id={clientId}>
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
                {!isLocalCameraEnabled && (
                  <DisabledMicroIcon>Camera Disabled</DisabledMicroIcon>
                )}
                {!isLocalMicrophoneEnabled && (
                  <DisabledMicroIcon>Micro Disabled</DisabledMicroIcon>
                )}
              </MainVideo>
            );
          })}
        <ButtonsContainer>
          <MediaButtonContainer>
            <MediaButton onClick={toggleMicrophone}>Micro</MediaButton>
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
      </VideochatContainer>
      <ChatContainer>TODO: text chat</ChatContainer>
    </PageContainer>
  );
}

export default VideochatRoom;
