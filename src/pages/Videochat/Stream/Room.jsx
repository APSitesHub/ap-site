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
  console.log('Room component loaded!');

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
        defaultLogoUrl: 'https://ap.education/assets/icon/LogoRevers.svg',
        logoImageUrl: 'https://ap.education/assets/icon/LogoRevers.svg',
        hideLogo: true,
        toolbarButtons: [
          'camera',
          'fullscreen',
          'settings',
          'hangup',
          'microphone',
          'toggle-camera',
          'closedcaptions',
        ],
      }}
      interfaceConfigOverwrite={{
        APP_NAME: 'APP_NAME',
        AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
        AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',

        /**
         * A UX mode where the last screen share participant is automatically
         * pinned. Valid values are the string "remote-only" so remote participants
         * get pinned but not local, otherwise any truthy value for all participants,
         * and any falsy value to disable the feature.
         *
         * Note: this mode is experimental and subject to breakage.
         */
        AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
        BRAND_WATERMARK_LINK: 'https://ap.education/assets/icon/LogoRevers.svg',

        CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables it

        DEFAULT_BACKGROUND: '#6671c4',
        DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://ap.education/assets/icon/LogoRevers.svg',

        DISABLE_DOMINANT_SPEAKER_INDICATOR: false,

        /**
         * If true, notifications regarding joining/leaving are no longer displayed.
         */
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,

        /**
         * If true, presence status: busy, calling, connected etc. is not displayed.
         */
        DISABLE_PRESENCE_STATUS: false,

        /**
         * Whether the speech to text transcription subtitles panel is disabled.
         * If {@code undefined}, defaults to {@code false}.
         *
         * @type {boolean}
         */
        DISABLE_TRANSCRIPTION_SUBTITLES: true,

        /**
         * Whether or not the blurred video background for large video should be
         * displayed on browsers that can support it.
         */
        DISABLE_VIDEO_BACKGROUND: false,

        DISPLAY_WELCOME_FOOTER: true,
        DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
        DISPLAY_WELCOME_PAGE_CONTENT: true,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: true,

        ENABLE_DIAL_OUT: true,

        FILM_STRIP_MAX_HEIGHT: 120,

        GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,

        /**
         * Hide the invite prompt in the header when alone in the meeting.
         */
        HIDE_INVITE_MORE_HEADER: true,

        JITSI_WATERMARK_LINK: 'https://google.com',

        LANG_DETECTION: true, // Allow i18n to detect the system language
        LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9

        /**
         * Maximum coefficient of the ratio of the large video to the visible area
         * after the large video is scaled to fit the window.
         *
         * @type {number}
         */
        MAXIMUM_ZOOMING_COEFFICIENT: 1.3,

        /**
         * Whether the mobile app Jitsi Meet is to be promoted to participants
         * attempting to join a conference in a mobile Web browser. If
         * {@code undefined}, defaults to {@code true}.
         *
         * @type {boolean}
         */
        MOBILE_APP_PROMO: true,

        // Names of browsers which should show a warning stating the current browser
        // has a suboptimal experience. Browsers which are not listed as optimal or
        // unsupported are considered suboptimal. Valid values are:
        // chrome, chromium, electron, firefox , safari, webkit
        OPTIMAL_BROWSERS: [
          'chrome',
          'chromium',
          'firefox',
          'electron',
          'safari',
          'webkit',
        ],

        POLICY_LOGO: 'https://ap.education/assets/icon/LogoRevers.svg',
        PROVIDER_NAME: 'AP Education',

        /**
         * If true, will display recent list
         *
         * @type {boolean}
         */
        RECENT_LIST_ENABLED: true,
        REMOTE_THUMBNAIL_RATIO: 1, // 1:1

        SETTINGS_SECTIONS: [
          'devices',
          'language',
          'moderator',
          'profile',
          'calendar',
          'sounds',
          'more',
        ],

        /**
         * Specify which sharing features should be displayed. If the value is not set
         * all sharing features will be shown. You can set [] to disable all.
         */
        // SHARING_FEATURES: ['email', 'url', 'dial-in', 'embed'],

        SHOW_BRAND_WATERMARK: false,

        /**
         * Decides whether the chrome extension banner should be rendered on the landing page and during the meeting.
         * If this is set to false, the banner will not be rendered at all. If set to true, the check for extension(s)
         * being already installed is done before rendering.
         */
        SHOW_CHROME_EXTENSION_BANNER: false,

        SHOW_JITSI_WATERMARK: false,
        SHOW_POWERED_BY: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,

        /*
         * If indicated some of the error dialogs may point to the support URL for
         * help.
         */
        SUPPORT_URL: 'https://community.jitsi.org/',

        // Browsers, in addition to those which do not fully support WebRTC, that
        // are not supported and should show the unsupported browser page.
        UNSUPPORTED_BROWSERS: [],

        /**
         * Whether to show thumbnails in filmstrip as a column instead of as a row.
         */
        VERTICAL_FILMSTRIP: true,

        // Determines how the video would fit the screen. 'both' would fit the whole
        // screen, 'height' would fit the original video height to the height of the
        // screen, 'width' would fit the original video width to the width of the
        // screen respecting ratio, 'nocrop' would make the video as large as
        // possible and preserve aspect ratio without cropping.
        VIDEO_LAYOUT_FIT: 'both',

        /**
         * If true, hides the video quality label indicating the resolution status
         * of the current large video.
         *
         * @type {boolean}
         */
        VIDEO_QUALITY_LABEL_DISABLED: false,
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
