import { BoxSchool } from 'components/Box/Box.styled';
import {
  PlayerLimiterNew,
  SectionDescription,
  SectionTitleNew,
  TitleBox,
  WhoAreWeItem,
  WhoAreWeList,
  WhoAreWePointer,
  WhoAreWeTrigger,
} from 'components/HowItWorks/HowItWorks.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/lazy';
import { APSchoolSection, APSchoolWrapper } from '../APSchool/APSchool.styled';
import { VideoBox } from './EdPlatform.styled';

export const EdPlatformPl = () => {
  const listItems = [
    'Платформа',
    'Онлайн-словник',
    'Інтерактивні уроки',
    'Призи для учнів',
  ];
  const videoUrls = [
    'https://youtu.be/QdC7YM_3NA4?t=10',
    'https://youtu.be/QdC7YM_3NA4?t=155',
    'https://youtu.be/QdC7YM_3NA4?t=240',
    'https://youtu.be/QdC7YM_3NA4?t=260',
  ];

  const [videoRef, videoInView] = useInView();
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/QdC7YM_3NA4');
  const [topPosition, setTopPosition] = useState('0%');
  const [isMuted, setIsMuted] = useState(true);

  const calculatePointerPosition = i => {
    setTopPosition(topPosition => (topPosition = `${i * 100}%`));
  };

  const toggleTimeCode = (item, i) => {
    setVideoUrl(videoUrl => (videoUrl = videoUrls[i]));
    setIsMuted(false);
  };

  return (
    <APSchoolSection id="platform-anchor">
      <BoxSchool>
        <APSchoolWrapper>
          <TitleBox>
            <SectionTitleNew>Навчальна платформа</SectionTitleNew>
            <SectionDescription>
            У Вас буде можливість обрати зручний формат навчання: самостійне вивчення, навчання в групах або індивідуальні заняття з польської мови з репетитором.
            </SectionDescription>
          </TitleBox>
          <WhoAreWeList>
            <WhoAreWePointer
              style={{ transform: `translateY(${topPosition})` }}
            />
            {listItems.map((item, i) => (
              <WhoAreWeItem key={i}>
                <WhoAreWeTrigger
                  onClick={() => {
                    calculatePointerPosition(i);
                    toggleTimeCode(item, i);
                  }}
                >
                  {item}
                </WhoAreWeTrigger>
              </WhoAreWeItem>
            ))}
          </WhoAreWeList>
        </APSchoolWrapper>
        <PlayerLimiterNew ref={videoRef} id="howitworks-anchor">
          {isMuted && <MarqueeSoundBtn />}
          <VideoBox>
            <ReactPlayer
              loop={true}
              controls={true}
              playing={videoInView ? true : false}
              muted={isMuted}
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
        </PlayerLimiterNew>
      </BoxSchool>
    </APSchoolSection>
  );
};
