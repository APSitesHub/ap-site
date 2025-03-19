import { useEffect, useRef, useCallback, useState } from 'react';
import useStateWithCallback from './useStateWithCallback';
import socket from '../socket';
import ACTIONS from '../socket/actions';
import { getToken } from '../api/getToken';
import { isRoomAdmin } from '../api/isRoomAdmin';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';
const debug = false;

export default function useWebRTC(roomID) {
  const [clients, updateClients] = useStateWithCallback([]);
  const [isLocalCameraEnabled, setLocalCameraEnabled] = useState(true);
  const [isLocalMicrophoneEnabled, setLocalMicrophoneEnabled] = useState(true);
  const [localDevices, setLocalDevices] = useState([]);
  const [localRole, setLocalRole] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isPremissionAllowed, setIsPremissionAllowed] = useState(null);
  const [mockVideosTo, setMockVideosTo] = useState([]);

  const determineRole = useCallback(async () => {
    if (!getToken()) {
      setLocalRole('user');
      return;
    }

    const role = (await isRoomAdmin(roomID)) ? 'admin' : 'user';

    setLocalRole(role);
  }, [roomID]);

  const getDevice = kind => {
    return localStorage.getItem(`default-${kind}`);
  };

  const setDevice = (kind, deviceId) => {
    localStorage.setItem(`default-${kind}`, deviceId);
  };

  const getMockVideo = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 3;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fakeVideoStream = canvas.captureStream(1);

    return fakeVideoStream.getVideoTracks()[0];
  };

  const addNewClient = useCallback(
    async (newClient, clientsData, cb) => {
      updateClients(list => {
        const exists = list.some(client => client.clientId === newClient);
        if (!exists) {
          return [
            ...list,
            {
              clientId: newClient,
              role: clientsData.role,
              isMicroEnabled: clientsData.isMicroEnabled,
              isCameraEnabled: clientsData.isCameraEnabled,
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

  const toggleCamera = async off => {
    let enable = !off;

    if (!isPremissionAllowed) {
      const permissions = await navigator.permissions.query({ name: 'camera' });
      permissions.state === 'denied' && alert('Не надано доступу до камери!');
    }

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

  const toggleMicrophone = async off => {
    let enable = !off;

    if (!isPremissionAllowed) {
      const permissions = await navigator.permissions.query({ name: 'camera' });
      permissions.state === 'denied' && alert('Не надано доступу до мікрофону!');
    }

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
      setDevice('audioinput', deviceId);
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
          if (!mockVideosTo.includes(id)) {
            const rtc = peerConnections.current[id];
            const senders = rtc.getSenders();
            const videoSender = senders.find(
              sender => sender.track && sender.track.kind === 'video'
            );

            if (videoSender) {
              videoSender.replaceTrack(videoTrack);
            }
          }
        });
      }

      if (!isLocalCameraEnabled) {
        toggleCamera();
      }
      setDevice('videoinput', deviceId);
    } catch (error) {
      console.error('error change camera: ' + error);
    }
  };

  const changeVisibility = (client, isVisible) => {
    socket.emit(ACTIONS.CHANGE_VISIBILITY, {
      client,
      isVisible,
    });
  };

  const muteAll = async () => {
    socket.emit(ACTIONS.MUTE_ALL);
  };

  async function startCapture() {
    let premissions;

    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const devices = await navigator.mediaDevices.enumerateDevices();
      setLocalDevices(devices);

      const defaultCamera =
        getDevice('videoinput') ||
        setDevice(
          'videoinput',
          devices.filter(device => device.kind === 'videoinput')[0].deviceId
        );

      const defaultMicrophone =
        getDevice('audioinput') ||
        setDevice(
          'audioinput',
          devices.find(device => device.kind === 'audioinput')[0].deviceId
        );

      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: defaultMicrophone },
        video: {
          deviceId: { exact: defaultCamera },
          width: localRole === 'admin' ? 1920 : 320,
          height: localRole === 'admin' ? 1080 : 180,
          frameRate: { ideal: 30 },
        },
      });

      premissions = true;
      setIsPremissionAllowed(true);
    } catch (error) {
      console.error('Error getting userMedia:', error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        premissions = false;
        setIsPremissionAllowed(false);
        setLocalCameraEnabled(false);
        setLocalMicrophoneEnabled(false);
        const emptyStream = new MediaStream();
        localMediaStream.current = emptyStream;
      }
    }

    if (localRole) {
      const localClientData = {
        role: localRole,
        isCameraEnabled: premissions,
        isMicroEnabled: premissions,
      };
      addNewClient(LOCAL_VIDEO, localClientData, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];
        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });

      socket.emit(ACTIONS.JOIN, {
        room: roomID,
        role: localRole,
        isCameraEnabled: premissions,
        isMicroEnabled: premissions,
      });
    }
  }

  const handleNewPeer = useCallback(
    async ({ peerID, clients: clientsData, createOffer }) => {
      if (peerConnections.current[peerID]) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:mcu.ap.education:5349',
          },
          {
            urls: 'turn:194.44.193.50:3478?transport=udp',
            username: 'mcuuser',
            credential: 'ExQGw3dhYfrY6PFj7FsaB92zJl',
          },
          {
            urls: 'turn:194.44.193.50:3478?transport=tcp',
            username: 'mcuuser',
            credential: 'ExQGw3dhYfrY6PFj7FsaB92zJl',
          },
          {
            urls: 'turn:194.44.193.50:5349',
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
          addNewClient(peerID, clientsData[peerID], () => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
            }
          });
        }
      };

      if (localMediaStream.current && localMediaStream.current.getTracks().length > 0) {
        localMediaStream.current.getTracks().forEach(track => {
          const sender = peerConnection.addTrack(track, localMediaStream.current);

          const params = sender.getParameters();
          if (!params.encodings) {
            params.encodings = [];
          }

          if (params.encodings && params.encodings.length > 0) {
            if (localRole === 'admin') {
              params.encodings[0].maxBitrate = 2000000;
              params.encodings[0].maxFramerate = 30;
              params.encodings[0].priority = 'high';
              params.encodings[0].networkPriority = 'high';
            } else {
              params.encodings[0].maxBitrate = 500000;
              params.encodings[0].maxFramerate = 20;
              params.encodings[0].priority = 'low';
              params.encodings[0].networkPriority = 'low';
            }
            sender.setParameters(params);
          }
        });
      } else {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const dest = audioContext.createMediaStreamDestination();
        oscillator.connect(dest);
        oscillator.start();
        const fakeAudioTrack = dest.stream.getAudioTracks()[0];

        const fakeVideoTrack = getMockVideo();
        const combinedStream = new MediaStream();
        combinedStream.addTrack(fakeAudioTrack);
        combinedStream.addTrack(fakeVideoTrack);
        peerConnection.addStream(combinedStream);
      }

      function setPreferredCodecs(sdp, preferredCodecs) {
        return sdp.replace(/(m=video.*?\r\n)/, match => {
          const codecLines = sdp
            .split('\r\n')
            .filter(line => preferredCodecs.some(codec => line.includes(` ${codec}/`)));

          const payloads = codecLines
            .map(line => line.match(/:(\d+) /)?.[1])
            .filter(Boolean);
          return match.replace(
            /(m=video \d+ [A-Za-z/]+ )\d+([\s\d]*)/,
            `$1${payloads.join(' ')}$2`
          );
        });
      }

      if (createOffer) {
        const offer = await peerConnection.createOffer();
        let sdp = offer.sdp;
        sdp = setPreferredCodecs(sdp, ['AV1', 'VP9', 'VP8', 'H264']);

        await peerConnection.setLocalDescription(
          new RTCSessionDescription({ type: 'offer', sdp })
        );

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        });
      }
    },
    [addNewClient, localRole]
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
  }, [handleNewPeer]);

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

    socket.on(ACTIONS.CHANGE_VISIBILITY, ({ peerID, isVisible }) => {
      const peer = peerConnections.current[peerID];

      if (peer) {
        const videoSender = peer
          .getSenders()
          .find(sender => sender.track.kind === 'video');

        if (videoSender) {
          if (isVisible) {
            videoSender.replaceTrack(localMediaStream.current.getVideoTracks()[0]);
            setMockVideosTo(oldState => {
              return oldState.filter(id => id !== peerID);
            });
          } else {
            videoSender.replaceTrack(getMockVideo());
            setMockVideosTo(oldState => {
              return [peerID, [...oldState]];
            });
          }
        }
      }
    });

    socket.on(ACTIONS.MUTE_ALL, () => {
      toggleMicrophone(true);
    });
  }, [updateClients]);

  useEffect(() => {
    if (debug) {
      const intervalId = setInterval(() => {
        console.log('===== WebRTC Debug Info =====');
        if (peerConnections.current) {
          const sendersTracks = [];
          const receivedTracks = [];
          const transceivers = [];
          Object.keys(peerConnections.current).forEach(id => {
            const rtc = peerConnections.current[id];

            console.log(id);

            rtc.getSenders().forEach(sender => {
              sendersTracks.push({
                peerId: id,
                sender,
                kind: sender.track?.kind,
                track: sender.track,
                params: sender.getParameters(),
              });
            });

            rtc.getReceivers().forEach(receiver => {
              receivedTracks.push({
                peerId: id,
                receiver,
                kind: receiver.track?.kind,
                track: receiver.track,
                params: receiver.getParameters(),
              });
            });

            rtc.getTransceivers().forEach(transceiver => {
              transceivers.push({
                peerId: id,
                transceiver,
              });
            });
          });
          console.log('=== Senders Tracks ===');
          console.log(sendersTracks);
          console.log('=== Received Tracks ===');
          console.log(receivedTracks);
          console.log('=== Transceivers ===');
          console.log(transceivers);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, []);

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
    console.log('clients: ', clients);
    console.log('permissions: ', isPremissionAllowed);
    console.log('localTracks: ', localMediaStream.current.getTracks());
    console.log('peers: ', peerConnections);

    Object.keys(peerConnections.current).forEach(id => {
      const rtc = peerConnections.current[id];

      const sender = rtc.getSenders();

      console.log('sender: ', sender);
    });
  };

  useEffect(() => {
    const prevStats = {};

    const logsInterval = setInterval(() => {
      Object.keys(peerConnections.current).forEach(async id => {
        const logs = {
          peerId: id,
          pairStats: {},
          outVideoStats: {},
          inVideoStats: {},
          outAudioStats: {},
          inAudioStats: {},
        };

        const stats = await peerConnections.current[id].getStats();

        stats.forEach(report => {
          if (report.type === 'candidate-pair' && report.state === 'succeeded') {
            logs.pairStats = {
              bitrate: (report.availableOutgoingBitrate / 1000).toFixed(2) + ' kbps',
              packetsSent: report.packetsSent,
              packetsReceived: report.packetsReceived,
              rtt: report.currentRoundTripTime.toFixed(3) + ' s',
            };
          }

          if (report.type === 'outbound-rtp' && report.kind === 'video') {
            logs.outVideoStats = calcBitrate(report, 'video_out', id);
          }

          if (report.type === 'inbound-rtp' && report.kind === 'video') {
            logs.inVideoStats = calcBitrate(report, 'video_in', id);
          }

          if (report.type === 'outbound-rtp' && report.kind === 'audio') {
            logs.outAudioStats = calcBitrate(report, 'audio_out', id);
          }

          if (report.type === 'inbound-rtp' && report.kind === 'audio') {
            logs.inAudioStats = calcBitrate(report, 'audio_in', id);
          }
        });

        if (Object.keys(logs).length > 0) {
          console.log(logs);
        }
      });
    }, 30000);

    function calcBitrate(report, key, id) {
      const now = Date.now();
      const prev = prevStats[id]?.[key];
      const tempBytes = report.bytesSent || report.bytesReceived;

      if (prev) {
        const timeDiff = (now - prev.timestamp) / 1000;
        const bytesDiff = tempBytes - prev.bytes;
        const bitrate = (bytesDiff * 8) / timeDiff;

        prevStats[id][key] = { bytes: tempBytes, timestamp: now };

        return {
          bitrate: (bitrate / 1000).toFixed(2) + ' kbps',
          packets: report.packetsSent || report.packetsReceived,
          jitter: report.jitter,
          frameRate: report.framesPerSecond || undefined,
          packetsLost: report.packetsLost,
        };
      }

      prevStats[id] = prevStats[id] || {};
      prevStats[id][key] = { bytes: tempBytes, timestamp: now };

      return {
        bitrate: 'Calculating...',
        packets: report.packetsSent || report.packetsReceived,
      };
    }

    return () => {
      clearInterval(logsInterval);
    };
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
    changeVisibility,
    muteAll,
    addMockClient,
    getClients,
    remoteStreams,
    localMediaStream,
    isLocalCameraEnabled,
    isLocalMicrophoneEnabled,
  };
}
