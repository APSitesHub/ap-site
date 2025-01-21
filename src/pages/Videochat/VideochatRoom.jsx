import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useWebRTC, { LOCAL_VIDEO } from './utils/hooks/useWebRTC';
import {
  ButtonsContainer,
  ChatContainer,
  DisabledMicroIcon,
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
  // const location = useLocation();
  const {
    clients,
    provideMediaRef,
    toggleCamera,
    toggleMicrophone,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  } = useWebRTC(roomID);
  const [allDevices, setAllDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  // const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  // const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  // const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    getAllDevices();
  }, []);

  useEffect(() => {
    const video = allDevices.filter(device => device.kind === 'videoinput');
    const audio = allDevices.filter(device => device.kind === 'audioinput');
    setVideoDevices(video);
    setAudioDevices(audio);
  }, [allDevices]);

  const getAllDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setAllDevices(devices);
  };

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
            <MediaSelector name="micro" id="micro">
              {audioDevices.map(device => (
                <MediaOption key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </MediaOption>
              ))}
            </MediaSelector>
          </MediaButtonContainer>
          <MediaButtonContainer>
            <MediaButton onClick={toggleCamera}>Camera</MediaButton>
            <MediaSelector name="camera" id="camera">
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
