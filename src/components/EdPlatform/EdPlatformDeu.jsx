import useSize from '@react-hook/size';
import { Box } from 'components/Box/Box.styled';
import { useRef, useState } from 'react';
import { YouTubeVideoSoundBtn } from 'components/HowItWorks/HowItWorks.styled';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/lazy';
import {
  EdPlatformArrow,
  EdPlatformArrowInView,
  EdPlatformArrowMobile,
  EdPlatformArrowMobileInView,
  EdPlatformBackground,
  EdPlatformNavigation,
  EdPlatformSection,
  EdPlatformSubTitle,
  EdPlatformTitle,
  EdPlatformWrapper,
  EdVideoToggler,
  MoreBtnBox,
  NavigationItem,
  VideoBox,
  VideoLimiter,
} from './EdPlatform.styled';

export const EdPlatformDeu = () => {
  const listItems = [
    'Платформа',
    'Онлайн-словник',
    'Інтерактивні уроки',
    'Призи для учнів',
  ];
  const videoUrls = [
    'https://youtu.be/kvZT_HoI7MM?t=14',
    'https://youtu.be/kvZT_HoI7MM?t=185',
    'https://youtu.be/kvZT_HoI7MM?t=282',
    'https://youtu.be/kvZT_HoI7MM?t=315',
  ];
  const [timeCode, setTimeCode] = useState('Німецька мова');
  const [videoUrl, setVideoUrl] = useState(videoUrls[0]);
  const edPlatformEl = useRef();
  // eslint-disable-next-line
  const [width, _] = useSize(edPlatformEl);
  const [videoRef, videoInView] = useInView();

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const toggleTimeCode = (item, i) => {
    setTimeCode(timeCode => (timeCode = item));
    setVideoUrl(videoUrl => (videoUrl = videoUrls[i]));
  };

  return (
    <EdPlatformBackground>
      <EdPlatformSection id="platform" ref={edPlatformEl}>
        <Box>
          <EdPlatformTitle id="platform-anchor">
            НАВЧАЛЬНА <EdPlatformSubTitle>ПЛАТФОРМА</EdPlatformSubTitle>
          </EdPlatformTitle>
          <EdPlatformWrapper>
            <VideoLimiter ref={videoRef}>
              <VideoBox>
                <YouTubeVideoSoundBtn />
                <ReactPlayer
                  loop={true}
                  controls={true}
                  playing={videoInView ? true : false}
                  muted={true}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  width="100%"
                  height="100%"
                  url={videoUrl}
                />
              </VideoBox>
            </VideoLimiter>
            <MoreBtnBox>
              <EdPlatformNavigation ref={ref}>
                {listItems.map((item, i) => (
                  <NavigationItem key={i}>
                    <EdVideoToggler
                      className={timeCode === item ? 'selected' : ''}
                      onClick={() => toggleTimeCode(item, i)}
                    >
                      {item}
                      {width < 768 ? (
                        <>
                          {inView && (
                            <EdPlatformArrowMobileInView
                              style={{ animationDelay: `${i}s` }}
                            />
                          )}
                          <EdPlatformArrowMobile className="on-hover" />
                        </>
                      ) : (
                        <>
                          {inView && (
                            <EdPlatformArrowInView
                              style={{ animationDelay: `${i}s` }}
                            />
                          )}
                          <EdPlatformArrow className="on-hover" />
                        </>
                      )}
                    </EdVideoToggler>
                  </NavigationItem>
                ))}
              </EdPlatformNavigation>
            </MoreBtnBox>
          </EdPlatformWrapper>
        </Box>
      </EdPlatformSection>
    </EdPlatformBackground>
  );
};
