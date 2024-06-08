import useSize from '@react-hook/size';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Kahoots } from './Kahoots/Kahoots';
import {
  ButtonBox,
  ChatBox,
  ChatBtn,
  ChatCloseBtn,
  ChatLogo,
  CloseLogo,
  KahootBtn,
  KahootLogo,
  StreamSection,
  VideoBox,
} from './Stream.styled';

export const Stream = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const sectionEl = useRef();
  const [sectionWidth, sectionHeight] = useSize(sectionEl);

  const toggleKahoot = e => {
    setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isChatOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleChat = () => {
    setIsChatOpen(isChatOpen => !isChatOpen);
    isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'chat')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const embedDomain = window.location.host.includes('localhost')
    ? 'localhost'
    : window.location.host;

  return (
    <StreamSection ref={sectionEl}>
      <VideoBox>
        <ReactPlayer
          playing={true}
          muted={true}
          controls={true}
          config={{
            youtube: {
              playerVars: { rel: 0 },
            },
          }}
          style={{
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          width="100%"
          height="100vh"
          url="https://youtu.be/HVyYoAFdpkI?si=dGE9akbRNnPcpPPg"
        />
      </VideoBox>

      <ButtonBox>
        {!isKahootOpen && (
          <KahootBtn onClick={toggleKahoot}>
            <KahootLogo />
          </KahootBtn>
        )}
        {!isChatOpen && (
          <ChatBtn onClick={toggleChat}>
            <ChatLogo />
          </ChatBtn>
        )}
      </ButtonBox>

      <ChatBox
        className={isChatOpen ? 'shown' : 'hidden'}
        style={isOpenedLast === 'chat' ? { zIndex: '1' } : { zIndex: '0' }}
      >
        <iframe
          title="chat"
          width="350px"
          height={sectionHeight}
          src={`https://www.youtube.com/live_chat?v=rUxyKA_-grg&embed_domain=${embedDomain}`}
        ></iframe>
        {isChatOpen && (
          <ChatCloseBtn onClick={toggleChat}>
            <CloseLogo />
          </ChatCloseBtn>
        )}
      </ChatBox>

      <Kahoots
        sectionWidth={sectionWidth}
        sectionHeight={sectionHeight}
        toggleKahoot={toggleKahoot}
        isKahootOpen={isKahootOpen}
        isOpenedLast={isOpenedLast}
      />
    </StreamSection>
  );
};
