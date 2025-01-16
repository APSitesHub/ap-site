import { useEffect, useRef, useCallback, useState } from 'react';
import freeice from 'freeice';
import useStateWithCallback from './useStateWithCallback';
import socket from '../socket';
import ACTIONS from '../socket/actions';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useWebRTC(roomID) {
  const [clients, updateClients] = useStateWithCallback([]);
  const [isCameraEnabled, setCameraEnabled] = useState(true);
  const [isMicrophoneEnabled, setMicrophoneEnabled] = useState(true);

  const determineRole = useCallback(peerID => {
    // TODO: implement a normal role determination
    if (peerID === LOCAL_VIDEO) {
      return 'admin';
    }
    return 'user';
  }, []);

  const addNewClient = useCallback(
    (newClient, cb) => {
      updateClients(list => {
        const exists = list.some(client => client.clientId === newClient);
        if (!exists) {
          const role = determineRole(newClient);
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
    [updateClients, determineRole]
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

        setCameraEnabled(videoTrack.enabled);
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
        setMicrophoneEnabled(audioTrack.enabled);
        socket.emit(ACTIONS.TOGGLE_MICRO, {
          isMicroEnabled: audioTrack.enabled,
        });
      }
    }
  };

  useEffect(() => {
    async function handleNewPeer({ peerID, createOffer }) {
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
          addNewClient(peerID, () => {
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

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER, handleNewPeer);
    };
  }, [addNewClient]);

  useEffect(() => {
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

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
    };
  }, []);

  useEffect(() => {
    const handleIceCandidate = ({ peerID, iceCandidate }) => {
      const peerConnection = peerConnections.current[peerID];
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
      }
    };

    socket.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);

    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
    };
  }, []);

  useEffect(() => {
    const handleRemovePeer = ({ peerID }) => {
      const peerConnection = peerConnections.current[peerID];
      if (peerConnection) {
        peerConnection.close();
      }

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      updateClients(list => list.filter(c => c !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.off(ACTIONS.REMOVE_PEER, handleRemovePeer);
    };
  }, [updateClients]);

  useEffect(() => {
    async function startCapture() {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 1280,
            height: 720,
          },
        });

        addNewClient(LOCAL_VIDEO, () => {
          const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
          if (localVideoElement) {
            localVideoElement.volume = 0;
            localVideoElement.srcObject = localMediaStream.current;
          }
        });

        socket.emit(ACTIONS.JOIN, { room: roomID });
      } catch (error) {
        console.error('Error getting userMedia:', error);
      }
    }

    startCapture();

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach(track => track.stop());
      }

      socket.emit(ACTIONS.LEAVE);
    };
  }, [addNewClient, roomID]);

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
  }, []);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  return {
    clients,
    provideMediaRef,
    toggleCamera,
    toggleMicrophone,
    isCameraEnabled,
    isMicrophoneEnabled,
  };
}
