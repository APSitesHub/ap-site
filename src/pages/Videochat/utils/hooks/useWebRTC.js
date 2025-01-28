import { useEffect, useRef, useCallback, useState } from 'react';
import freeice from 'freeice';
import useStateWithCallback from './useStateWithCallback';
import socket from '../socket';
import ACTIONS from '../socket/actions';
import axios from 'axios';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';
axios.defaults.baseURL = 'http://localhost:3001';

export default function useWebRTC(roomID) {
  const [clients, updateClients] = useStateWithCallback([]);
  const [isLocalCameraEnabled, setLocalCameraEnabled] = useState(true);
  const [isLocalMicrophoneEnabled, setLocalMicrophoneEnabled] = useState(true);
  const [localDevices, setLocalDevices] = useState([]);
  const [localRole, setLocalRole] = useState(null);
  const [remoteRoles, setRemoteRoles] = useState({});

  const determineRole = async () => {
    try {
      const response = await axios.get(
        `/room/isRoomAdmin?id=${roomID}&mail=${getLocalUserMail()}`
      );

      const role = response.data.isRoomAdmin ? 'admin' : 'user';
      setLocalRole(role);
    } catch (error) {
      console.error('Error determining user role:', error);
    }
  };

  const getLocalUserMail = () => {
    return localStorage.getItem('mail');
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
          const vt = targetObj
            .getSenders()
            .find(sender => sender.track.kind === 'video');
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

  const toggleMicrophone = () => {
    if (localMediaStream.current) {
      const audioTrack = localMediaStream.current
        .getTracks()
        .find(track => track.kind === 'audio');

      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;

        Object.entries(peerConnections.current).forEach(([id, targetObj]) => {
          const at = targetObj
            .getSenders()
            .find(sender => sender.track.kind === 'audio');
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

  async function startCapture() {
    try {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
        },
      });

      const devices = await navigator.mediaDevices.enumerateDevices();
      setLocalDevices(devices);

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

  async function setRemoteMedia({
    peerID,
    sessionDescription: remoteDescription,
  }) {
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
    determineRole()
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
  }, [updateClients]);

  useEffect(() => {
    startCapture();

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach(track => track.stop());
      }

      socket.emit(ACTIONS.LEAVE);
    };
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
  }, [updateClients]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  return {
    clients,
    provideMediaRef,
    localDevices,
    toggleCamera,
    toggleMicrophone,
    changeCamera,
    changeMicrophone,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  };
}
