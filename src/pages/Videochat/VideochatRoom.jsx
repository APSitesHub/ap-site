import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const {
    clients,
    provideMediaRef,
    toggleCamera,
    toggleMicrophone,
    isCameraEnabled,
    isMicrophoneEnabled,
  } = useWebRTC(roomID);
  const [allDevices, setAllDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    if (userId) {
    } else {
    }
  }, [clients]);

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
                {!isCameraEnabled && (
                  <DisabledMicroIcon>Camera Disabled</DisabledMicroIcon>
                )}
                {!isMicrophoneEnabled && (
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
