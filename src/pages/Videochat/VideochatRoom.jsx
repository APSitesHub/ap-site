import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useWebRTC, { LOCAL_VIDEO } from './utils/hooks/useWebRTC';
import {
  ButtonsContainer,
  ChatContainer,
  MicroIcon,
  DisabledMicroIcon,
  CameraIcon,
  DisabledCameraIcon,
  ArrowUp,
  ArrowDown,
  MainVideoContainer,
  MainVideo,
  MediaButton,
  MediaButtonContainer,
  MediaOption,
  MediaSelector,
  PageContainer,
  SideContainer,
  UsersVideosContainer,
  UserVideo,
  VideochatContainer,
} from './Videochat.styled';

const VISIBLE_USERS_COUNT = 4;

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
  const [page, setPage] = useState(0);

  useEffect(() => {
    const video = localDevices.filter(device => device.kind === 'videoinput');
    const audio = localDevices.filter(device => device.kind === 'audioinput');
    setAudioDevices(audio);
    setVideoDevices(video);
  }, [localDevices]);

  const changePage = (isUp) => {
    if (isUp) {
      setPage(prevPage => prevPage - 1);
    } else {
      setPage(prevPage => prevPage + 1);

    }
  }

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
                  <DisabledCameraIcon $isAbsolute />
                )}
                {(!isMicroEnabled ||
                  (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                  <DisabledMicroIcon $isAbsolute />
                )}

                <ButtonsContainer>
                  {localRole === 'admin' && (
                    <MediaButtonContainer>
                      <MediaButton onClick={muteAll}>Mute All</MediaButton>
                    </MediaButtonContainer>
                  )}
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
                </ButtonsContainer>
              </MainVideoContainer>
            );
          })}

        {clients.filter(({ role }) => role !== 'admin').length > 0 && (
          <SideContainer>
            <MediaButtonContainer $isPagintionButton>
              <MediaButton onClick={() => changePage(true)} disabled={page === 0}>
                <ArrowUp />
              </MediaButton>
            </MediaButtonContainer>
            <UsersVideosContainer>
              {clients
                .filter(({ role }) => role !== 'admin')
                .slice(page, page + VISIBLE_USERS_COUNT)
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
                      <div style={{ position: 'absolute', color: 'white' }}>
                        {clientId}
                      </div>
                      {(!isCameraEnabled ||
                        (clientId === LOCAL_VIDEO && !isLocalCameraEnabled)) && (
                        <DisabledCameraIcon $isAbsolute $isSmall />
                      )}
                      {(!isMicroEnabled ||
                        (clientId === LOCAL_VIDEO && !isLocalMicrophoneEnabled)) && (
                        <DisabledMicroIcon $isAbsolute $isSmall />
                      )}
                    </UserVideo>
                  );
                })}
            </UsersVideosContainer>
            <MediaButtonContainer $isPagintionButton>
              <MediaButton onClick={() => changePage(false)} disabled={page + VISIBLE_USERS_COUNT >= clients.length - 1}>
                <ArrowDown />
              </MediaButton>
            </MediaButtonContainer>
          </SideContainer>
        )}
      </VideochatContainer>
      <ChatContainer>TODO: text chat</ChatContainer>
    </PageContainer>
  );
}

export default VideochatRoom;
