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

  const toggleMicrophone = mute => {
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
      const audioTrack = newStream.getAudioTracks()[0];

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
      const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

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
        video: { width: 1280, height: 720 },
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
              width: localRole === 'admin' ? 1920 : 320,
              height: localRole === 'admin' ? 1080 : 180,
            }
          : {
              width: localRole === 'admin' ? 1920 : 320,
              height: localRole === 'admin' ? 1080 : 180,
            },
      });

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
      iceServers: [
        { urls: [ "stun:fr-turn7.xirsys.com" ]},
        {
          username: "rML4PodE2lPMv5sdudSaQiggcUIbJcSOWCgCdt7hyAbOmbdBL5pdMNpY0InU0j8HAAAAAGevPBlJbGxpYQ==",
          credential: "47c1cabe-ead2-11ef-8c23-0242ac120004",
          urls: [
            "turn:fr-turn7.xirsys.com:80?transport=udp",
            "turn:fr-turn7.xirsys.com:3478?transport=udp",
            "turn:fr-turn7.xirsys.com:80?transport=tcp",
            "turn:fr-turn7.xirsys.com:3478?transport=tcp",
            "turns:fr-turn7.xirsys.com:443?transport=tcp",
            "turns:fr-turn7.xirsys.com:5349?transport=tcp",
          ]
        }
      ]
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
