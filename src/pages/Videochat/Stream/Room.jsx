import { JitsiMeeting } from '@jitsi/react-sdk';
import JitsiMeetJS from 'lib-jitsi-meet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const Room = () => {
//   const { id: roomID } = useParams();
//   const [options, setOptions] = useState({
//     hosts: {
//       domain: 'localhost',
//       muc: 'conference.localhost',
//       focus: 'focus.localhost',
//       anonymousdomain: 'localhost',
//     },
//     serviceUrl: `ws://localhost:8000/xmpp-websocket?room=${roomID}`,
//     externalConnectUrl: 'https://localhost/http-pre-bind',
//     enableP2P: true,
//     p2p: {
//       enabled: true,
//     },
//     useStunTurn: true,
//     useIPv6: false,
//     constraints: {
//       video: {
//         height: {
//           ideal: 720,
//           max: 720,
//           min: 180,
//         },
//         width: {
//           ideal: 1280,
//           max: 1280,
//           min: 320,
//         },
//       },
//     },
//     channelLastN: 25,
//   });

//   console.log(JitsiMeetJS);

//   JitsiMeetJS.init(options);

//   const connection = new JitsiMeetJS.JitsiConnection(null, null, options);

//   const onConnectionSuccess = () => {
//     console.log('Connection Successful!');
//   };

//   const onConnectionFailed = () => {
//     console.log('Connection Failed!');
//   };

//   const disconnect = () => {
//     console.log('Disconnected!');
//   };

//   connection.addEventListener(
//     JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
//     onConnectionSuccess
//   );
//   connection.addEventListener(
//     JitsiMeetJS.events.connection.CONNECTION_FAILED,
//     onConnectionFailed
//   );
//   connection.addEventListener(
//     JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
//     disconnect
//   );

//   connection.connect();

//   return <div>123</div>;
// };

const Room = () => {
  const test = iframeRef => {
    setInterval(() => {
      const iframe = document.querySelector('iframe');
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      const links = iframeDoc.querySelectorAll('a');
      console.log(links);
    }, 1000);
  };

  return (
    <JitsiMeeting
      domain="localhost:8443"
      roomName="qweqweqwe"
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      userInfo={{
        displayName: 'YOUR_USERNAME',
      }}
      getIFrameRef={iframeRef => {
        iframeRef.style.height = '100dvh';

        iframeRef.onload = test(iframeRef);
      }}
    />
  );
};

export default Room;
