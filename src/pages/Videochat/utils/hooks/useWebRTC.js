import { useEffect, useRef, useCallback, useState } from 'react';
import useStateWithCallback from './useStateWithCallback';
import socket from '../socket';
import ACTIONS from '../socket/actions';
import { getToken } from '../api/getToken';
import { isRoomAdmin } from '../api/isRoomAdmin';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useWebRTC(roomID) {
  const [clients, updateClients] = useStateWithCallback([]);
  const [isLocalCameraEnabled, setLocalCameraEnabled] = useState(true);
  const [isLocalMicrophoneEnabled, setLocalMicrophoneEnabled] = useState(true);
  const [localDevices, setLocalDevices] = useState([]);
  const [localRole, setLocalRole] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isPremissionAllowed, setIsPremissionAllowed] = useState(null);

  const determineRole = useCallback(async () => {
    if (!getToken()) {
      setLocalRole('user');
      return;
    }

    const role = (await isRoomAdmin(roomID)) ? 'admin' : 'user';

    setLocalRole(role);
  }, [roomID]);

  const addNewClient = useCallback(
    async (newClient, role, cb) => {
      updateClients(list => {
        const exists = list.some(client => client.clientId === newClient);
        if (!exists) {
          return [
            ...list,
            {
              clientId: newClient,
              role,
              isMicroEnabled: true,
              isCameraEnabled: true,
            },
          ];
        }
        return list;
      }, cb);
    },
    [updateClients]
  );

  const peerConnections = useRef({});
  const localMediaStream = useRef(null);
  const peerMediaElements = useRef({
    [LOCAL_VIDEO]: null,
  });

  const toggleCamera = off => {
    let enable = !off;

    if (localMediaStream.current) {
      const videoTrack = localMediaStream.current
        .getTracks()
        .find(track => track.kind === 'video');

      if (videoTrack) {
        enable = off === true ? false : !videoTrack.enabled;
        videoTrack.enabled = enable;

        Object.entries(peerConnections.current).forEach(([id, targetObj]) => {
          const vt = targetObj.getSenders().find(sender => sender.track.kind === 'video');
          vt.track.enabled = enable;
        });

        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

        if (enable) {
          localVideoElement.srcObject = localMediaStream.current;
        } else {
          localVideoElement.srcObject = null;
        }
      }
    }

    setLocalCameraEnabled(enable);
    socket.emit(ACTIONS.TOGGLE_CAMERA, {
      isCameraEnabled: enable,
    });
  };

  const toggleMicrophone = off => {
    let enable = !off;

    if (localMediaStream.current) {
      const audioTrack = localMediaStream.current
        .getTracks()
        .find(track => track.kind === 'audio');

      if (audioTrack) {
        enable = off === true ? false : !audioTrack.enabled;
        audioTrack.enabled = enable;

        Object.entries(peerConnections.current).forEach(([id, targetObj]) => {
          const at = targetObj.getSenders().find(sender => sender.track.kind === 'audio');
          at.track.enabled = enable;
        });
      }
    }

    setLocalMicrophoneEnabled(enable);
    socket.emit(ACTIONS.TOGGLE_MICRO, {
      isMicroEnabled: enable,
    });
  };

  const changeMicrophone = async deviceId => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
        video: false,
      });
      const audioTrack = newStream.getAudioTracks()[0];
      const videoTrack = localMediaStream.current.getVideoTracks()[0];

      newStream.addTrack(videoTrack);
      localMediaStream.current = newStream;

      if (peerConnections.current) {
        Object.keys(peerConnections.current).forEach(id => {
          const rtc = peerConnections.current[id];
          const senders = rtc.getSenders();
          const audioSender = senders.find(
            sender => sender.track && sender.track.kind === 'audio'
          );

          if (audioSender) {
            audioSender.replaceTrack(audioTrack);
          }
        });
      }

      if (!isLocalMicrophoneEnabled) {
        toggleMicrophone();
      }
    } catch (error) {
      console.error('error change micro: ' + error);
    }
  };

  const changeCamera = async deviceId => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { deviceId: { exact: deviceId } },
      });
      const videoTrack = newStream.getVideoTracks()[0];
      const audioTrack = localMediaStream.current.getAudioTracks()[0];
      const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
      newStream.addTrack(audioTrack);
      localMediaStream.current = newStream;
      localVideoElement.srcObject = newStream;

      if (peerConnections.current) {
        Object.keys(peerConnections.current).forEach(id => {
          const rtc = peerConnections.current[id];
          const senders = rtc.getSenders();
          const videoSender = senders.find(
            sender => sender.track && sender.track.kind === 'video'
          );

          if (videoSender) {
            videoSender.replaceTrack(videoTrack);
          }
        });
      }

      if (!isLocalCameraEnabled) {
        toggleCamera();
      }
    } catch (error) {
      console.error('error change camera: ' + error);
    }
  };

  const muteAll = async () => {
    socket.emit('mute-all');
  };

  async function startCapture() {
    try {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const devices = await navigator.mediaDevices.enumerateDevices();
      setLocalDevices(devices);

      const defaultCamera = devices.find(device => device.kind === 'videoinput');
      const defaultMicrophone = devices.find(device => device.kind === 'audioinput');

      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: defaultMicrophone ? { deviceId: defaultMicrophone.deviceId } : true,
        video: defaultCamera
          ? {
              deviceId: { exact: defaultCamera.deviceId },
              width: { min: 1280, ideal: 1920 },
              height: { min: 720, ideal: 1080 },
              frameRate: { min: 30, ideal: 30 },
            }
          : {
              width: { min: 1280, ideal: 1920 },
              height: { min: 720, ideal: 1080 },
              frameRate: { min: 30, ideal: 30 },
            },
      });

      // if (localRole === 'admin') {
      //   localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      //     audio: defaultMicrophone ? { deviceId: defaultMicrophone.deviceId } : true,
      //     video: defaultCamera
      //       ? {
      //           deviceId: { exact: defaultCamera.deviceId },
      //           width: { min: 1280, ideal: 1920 },
      //           height: { min: 720, ideal: 1080 },
      //           frameRate: { min: 30, ideal: 30 },
      //         }
      //       : {
      //           width: { min: 1280, ideal: 1920 },
      //           height: { min: 720, ideal: 1080 },
      //           frameRate: { min: 30, ideal: 30 },
      //         },
      //   });
      // } else {
      //   localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      //     audio: defaultMicrophone ? { deviceId: defaultMicrophone.deviceId } : true,
      //     video: defaultCamera
      //       ? {
      //           deviceId: { exact: defaultCamera.deviceId },
      //           width: { min: 640, ideal: 854 },
      //           height: { min: 360, ideal: 480 },
      //           frameRate: { ideal: 30 },
      //         }
      //       : {
      //           width: { min: 640, ideal: 854 },
      //           height: { min: 360, ideal: 480 },
      //           frameRate: { ideal: 30 },
      //         },
      //   });
      // }

      setIsPremissionAllowed(true);
    } catch (error) {
      console.error('Error getting userMedia:', error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setIsPremissionAllowed(false);
        const emptyStream = new MediaStream();
        localMediaStream.current = emptyStream;
      }
    }

    if (localRole) {
      addNewClient(LOCAL_VIDEO, localRole, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });

      socket.emit(ACTIONS.JOIN, { room: roomID, role: localRole });
    }
  }

  const handleNewPeer = useCallback(
    async ({ peerID, roles, createOffer }) => {
      if (peerConnections.current[peerID]) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:mcu.ap.education:5349',
          },
          {
            urls: 'turn:mcu.ap.education:5349',
            username: 'mcuuser',
            credential: 'ExQGw3dhYfrY6PFj7FsaB92zJl',
          },
        ],
      });

      peerConnections.current[peerID] = peerConnection;

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: event.candidate,
          });
        }
      };

      let tracksNumber = 0;

      peerConnection.ontrack = ({ streams: [remoteStream] }) => {
        tracksNumber++;

        setRemoteStreams(prevStreams => {
          const streamExists = prevStreams.some(stream => stream.peerID === peerID);
          if (streamExists) {
            return prevStreams;
          }

          return [
            ...prevStreams,
            {
              peerID,
              remoteStream,
            },
          ];
        });

        if (tracksNumber === 2) {
          addNewClient(peerID, roles[peerID], () => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
            }
          });
        }
      };

      let adminKey = '';

      for (const [key, value] of Object.entries(roles)) {
        if (value === 'admin') {
          adminKey = key;
          break;
        }
      }

      if (localMediaStream.current && localMediaStream.current.getTracks().length > 0) {
        if (adminKey === peerID) {
          localMediaStream.current.getTracks().forEach(track => {
            const sender = peerConnection.addTrack(track, localMediaStream.current);

            const params = sender.getParameters();

            if (params.encodings && params.encodings.length > 0) {
              params.encodings[0].maxBitrate = 2000000; // 2 MB/s
              params.encodings[0].maxFramerate = 30;
              params.encodings[0].priority = 'high';
              params.encodings[0].networkPriority = 'high';
              sender.setParameters(params);
            }
          });
        } else {
          localMediaStream.current.getTracks().forEach(track => {
            peerConnection.addTrack(track, localMediaStream.current);
          });
        }
      } else {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const dest = audioContext.createMediaStreamDestination();
        oscillator.connect(dest);
        oscillator.start();
        const fakeAudioTrack = dest.stream.getAudioTracks()[0];

        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 3;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fakeVideoStream = canvas.captureStream(1);
        const fakeVideoTrack = fakeVideoStream.getVideoTracks()[0];

        const combinedStream = new MediaStream();
        combinedStream.addTrack(fakeAudioTrack);
        combinedStream.addTrack(fakeVideoTrack);
        peerConnection.addStream(combinedStream);
      }

      if (createOffer) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        });
      }
    },
    [addNewClient, isLocalCameraEnabled, isLocalMicrophoneEnabled]
  );

  async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }) {
    const peerConnection = peerConnections.current[peerID];
    if (!peerConnection) return;

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(remoteDescription)
    );

    if (remoteDescription.type === 'offer') {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerID,
        sessionDescription: answer,
      });
    }
  }

  const handleIceCandidate = ({ peerID, iceCandidate }) => {
    const peerConnection = peerConnections.current[peerID];
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
    }
  };

  const handleRemovePeer = ({ peerID }) => {
    const peerConnection = peerConnections.current[peerID];
    if (peerConnection) {
      peerConnection.close();
    }

    delete peerConnections.current[peerID];
    delete peerMediaElements.current[peerID];

    updateClients(list => list.filter(c => c.clientId !== peerID));
  };

  useEffect(() => {
    determineRole();
  }, [determineRole]);

  useEffect(() => {
    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER, handleNewPeer);
    };
  }, [addNewClient]);

  useEffect(() => {
    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
    };
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);

    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
    };
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.off(ACTIONS.REMOVE_PEER, handleRemovePeer);
    };
    // eslint-disable-next-line
  }, [updateClients]);

  useEffect(() => {
    startCapture();

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach(track => track.stop());
      }

      socket.emit(ACTIONS.LEAVE);
    };
    // eslint-disable-next-line
  }, [addNewClient, roomID, localRole]);

  useEffect(() => {
    socket.on(ACTIONS.TOGGLE_MICRO, client => {
      updateClients(list => {
        return list.map(item => {
          if (item.clientId === client.peerID) {
            return {
              ...item,
              isMicroEnabled: client.isMicroEnabled,
            };
          }

          return {
            ...item,
          };
        });
      });
    });

    socket.on(ACTIONS.TOGGLE_CAMERA, client => {
      updateClients(list => {
        return list.map(item => {
          if (item.clientId === client.peerID) {
            return {
              ...item,
              isCameraEnabled: client.isCameraEnabled,
            };
          }

          return {
            ...item,
          };
        });
      });
    });

    socket.on('mute-all', () => {
      toggleMicrophone(true);
    });
  }, [updateClients]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  const addMockClient = () => {
    const mockClientId = Math.random();
    addNewClient(mockClientId, 'user', () => {
      console.log(mockClientId);
    });
  };

  const getClients = () => {
    console.log(clients);
  };

  return {
    clients,
    provideMediaRef,
    localRole,
    localDevices,
    toggleCamera,
    toggleMicrophone,
    changeCamera,
    changeMicrophone,
    muteAll,
    addMockClient,
    getClients,
    remoteStreams,
    localMediaStream,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
    isPremissionAllowed,
  };
}
