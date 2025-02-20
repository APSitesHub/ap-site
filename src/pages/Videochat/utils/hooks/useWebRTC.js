import { useEffect, useRef, useCallback, useState } from 'react';
import freeice from 'freeice';
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

  const determineRole = async () => {
    if (!getToken()) {
      setLocalRole('user');
      return;
    }

    const role = (await isRoomAdmin(roomID)) ? 'admin' : 'user';

    setLocalRole(role);
  };

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

  const toggleCamera = () => {
    if (localMediaStream.current) {
      const videoTrack = localMediaStream.current
        .getTracks()
        .find(track => track.kind === 'video');

      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;

        Object.entries(peerConnections.current).forEach(([id, targetObj]) => {
          const vt = targetObj.getSenders().find(sender => sender.track.kind === 'video');
          vt.track.enabled = videoTrack.enabled;
        });

        setLocalCameraEnabled(videoTrack.enabled);
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

        if (videoTrack.enabled) {
          localVideoElement.srcObject = localMediaStream.current;
        } else {
          localVideoElement.srcObject = null;
        }

        socket.emit(ACTIONS.TOGGLE_CAMERA, {
          isCameraEnabled: videoTrack.enabled,
        });
      }
    }
  };

  const toggleMicrophone = (_event, mute) => {
    if (localMediaStream.current) {
      const audioTrack = localMediaStream.current
        .getTracks()
        .find(track => track.kind === 'audio');

      if (audioTrack) {
        if (mute === true) {
          audioTrack.enabled = false;
        } else {
          audioTrack.enabled = !audioTrack.enabled;
        }
        Object.entries(peerConnections.current).forEach(([id, targetObj]) => {
          const at = targetObj.getSenders().find(sender => sender.track.kind === 'audio');
          at.track.enabled = audioTrack.enabled;
        });

        setLocalMicrophoneEnabled(audioTrack.enabled);
        socket.emit(ACTIONS.TOGGLE_MICRO, {
          isMicroEnabled: audioTrack.enabled,
        });
      }
    }
  };

  const changeMicrophone = async deviceId => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
        video: false,
      });

      const newAudioTrack = newStream.getAudioTracks()[0];

      if (!newAudioTrack) {
        console.warn('failed get audio from: ', deviceId);
        return;
      }

      if (localMediaStream.current) {
        const oldAudioTrack = localMediaStream.current.getAudioTracks()[0];

        if (oldAudioTrack) {
          localMediaStream.current.removeTrack(oldAudioTrack);
          oldAudioTrack.stop();
        }

        localMediaStream.current.addTrack(newAudioTrack);
      } else {
        localMediaStream.current = newStream;
      }

      if (peerConnections.current) {
        Object.keys(peerConnections.current).forEach(id => {
          const rtc = peerConnections.current[id];
          const senders = rtc.getSenders();
          const audioSender = senders.find(
            sender => sender.track && sender.track.kind === 'audio'
          );

          if (audioSender) {
            audioSender.replaceTrack(newAudioTrack);
          }
        });
      }
      setLocalMicrophoneEnabled(true);
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

      const newVideoTrack = newStream.getVideoTracks()[0];
      const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

      if (!newVideoTrack) {
        console.warn('failed get video from: ', deviceId);
        return;
      }

      if (localMediaStream.current) {
        const oldVideoTrack = localMediaStream.current.getVideoTracks()[0];

        if (oldVideoTrack) {
          localMediaStream.current.removeTrack(oldVideoTrack);
          oldVideoTrack.stop();
        }

        localMediaStream.current.addTrack(newVideoTrack);
      } else {
        localMediaStream.current = newStream;
      }

      if (localVideoElement) {
        localVideoElement.srcObject = localMediaStream.current;
      }

      if (peerConnections.current) {
        Object.keys(peerConnections.current).forEach(id => {
          const rtc = peerConnections.current[id];
          const senders = rtc.getSenders();
          const videoSender = senders.find(
            sender => sender.track && sender.track.kind === 'video'
          );

          if (videoSender) {
            videoSender.replaceTrack(newVideoTrack);
          }
        });
      }
      setLocalCameraEnabled(true);
    } catch (error) {
      console.error('error change camera: ' + error);
    }
  };

  const muteAll = async () => {
    socket.emit('mute-all');
  };

  async function startCapture() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      setLocalDevices(devices);

      const defaultCamera = devices.find(device => device.kind === 'videoinput');
      const defaultMicrophone = devices.find(device => device.kind === 'audioinput');

      let audioTrack = null;
      let videoTrack = null;
      let audioError = false;
      let videoError = false;

      try {
        if (defaultCamera) {
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: defaultCamera.deviceId },
              width: localRole === 'admin' ? 1920 : 320,
              height: localRole === 'admin' ? 1080 : 180,
            },
            audio: false,
          });
          videoTrack = videoStream.getVideoTracks()[0];
        } else {
          throw new Error('Video not found');
        }
      } catch (error) {
        console.warn('Error video getting: ', error);
        videoError = true;
        setLocalCameraEnabled(false);
      }

      try {
        if (defaultMicrophone) {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: defaultMicrophone.deviceId },
            video: false,
          });
          audioTrack = audioStream.getAudioTracks()[0];
        } else {
          throw new Error('Micro not found');
        }
      } catch (error) {
        console.warn('Error micro getting: ', error);
        audioError = true;
        setLocalMicrophoneEnabled(false);
      }

      if (videoError && audioError) {
        console.error('devices not found');
        return;
      }

      localMediaStream.current = new MediaStream();
      if (videoTrack) localMediaStream.current.addTrack(videoTrack);
      if (audioTrack) localMediaStream.current.addTrack(audioTrack);

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
    } catch (error) {
      console.error('Error getting userMedia:', error);
    }
  }

  async function handleNewPeer({ peerID, roles, createOffer }) {
    if (peerConnections.current[peerID]) {
      return console.warn(`Already connected to peer ${peerID}`);
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: freeice(),
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

      if (tracksNumber === 2) {
        addNewClient(peerID, roles[peerID], () => {
          if (peerMediaElements.current[peerID]) {
            peerMediaElements.current[peerID].srcObject = remoteStream;
          }
        });
      }
    };

    if (localMediaStream.current) {
      localMediaStream.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localMediaStream.current);
      });
    }

    if (createOffer) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerID,
        sessionDescription: offer,
      });
    }
  }

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
  }, []);

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
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  };
}
