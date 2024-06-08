import useSize from '@react-hook/size';
import { Box } from 'components/Box/Box.styled';
import {
  PageNavigation,
  PageNavigationArrow,
  PageNavigationItem,
  PageNavigationLink,
} from 'components/HowItWorks/HowItWorks.styled';
import { LeadBtn } from 'components/Menu/Menu.styled';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/lazy';
import {
  BottomPageNavigationText,
  ExamCenterBackground,
  ExamCenterList,
  ExamCenterSection,
  ExamCenterSubTitle,
  ExamCenterTitle,
  ExamCenterWrapper,
  ExamToggler,
  ExamTogglerUnderlineLong,
  ExamTogglerUnderlineMedium,
  ExamTogglerUnderlineShort,
  LoopyLineIcon,
  NavAnimationWrapper,
  NavigationDesc,
  NavigationItem,
  NavigationWrapper,
  VideoBox,
  VideoLimiter
} from './ExamCenter.styled';

export const ExamCenter = ({ toggleModal }) => {
  const [examType, setExamType] = useState('ESOL');
  const [videoUrl, setVideoUrl] = useState(
    'https://youtu.be/cJH4FUP99rA?si=clJ5upwIiebB7Fzt'
  );
  const listItems = ['ESOL', 'TOEFL', 'IELTS', 'CAMBRIDGE ENGLISH'];
  const videoUrls = [
    'https://youtu.be/cJH4FUP99rA?si=clJ5upwIiebB7Fzt',
    'https://youtu.be/RRKiBZi9moY?si=83dwA-AgfQRqIqZV',
    'https://youtu.be/NEe6hl7msfs?si=V8YaLMy1gqtR6vys',
    'https://youtu.be/IpnNTWCL3to?si=r7wIOnJWIXgckw-s',
  ];
  const navListItems = [
    { to: 'edcenter', service: 'Навчальний центр' },
    { to: 'admissions', service: 'Вступ до ВНЗ' },
    { to: 'translations', service: 'Перекладацьке бюро' },
    { to: 'examcenter', service: 'Екзаменаційний центр' },
  ];
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const props =
    width < 768
      ? { spy: true, smooth: true, offset: -73 }
      : { spy: true, smooth: true };

  const toggleExam = (item, i) => {
    setExamType(examType => (examType = item));
    setVideoUrl(videoUrl => (videoUrl = videoUrls[i]));
  };

  return (
    <ExamCenterBackground>
      <ExamCenterSection id="examcenter">
        <Box>
        <ExamCenterTitle>
            ЕКЗАМЕНАЦІЙНИЙ <ExamCenterSubTitle>ЦЕНТР</ExamCenterSubTitle>
          </ExamCenterTitle>
          <ExamCenterWrapper>
            <LeadBtn onClick={toggleModal}> ЗАЛИШИТИ ЗАЯВКУ </LeadBtn>
            <ExamCenterList>
              {listItems.map((item, i) => (
                <NavigationItem key={i}>
                  <ExamToggler
                    className={examType === item ? 'selected' : ''}
                    onClick={() => toggleExam(item, i)}
                  >
                    {item}
                    {item.length > 10 ? (
                      <ExamTogglerUnderlineLong />
                    ) : item.length > 4 ? (
                      <ExamTogglerUnderlineMedium />
                    ) : (
                      <ExamTogglerUnderlineShort />
                    )}
                  </ExamToggler>
                </NavigationItem>
              ))}
            </ExamCenterList>
          </ExamCenterWrapper>
          <VideoLimiter>
            <VideoBox>
              <ReactPlayer
                loop={true}
                // playing={true}
                muted={true}
                controls={true}
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
          <NavAnimationWrapper ref={ref}>
          {/* {inView && <LoopyLineMirroredIcon />} */}
            <NavigationWrapper>
              <NavigationDesc>... всі наші послуги</NavigationDesc>
              <PageNavigation>
                {navListItems.map((item, i) => (
                  <PageNavigationItem key={i}>
                    <PageNavigationLink to={item.to} {...props}>
                      {item.service}
                      <PageNavigationArrow />
                      <BottomPageNavigationText>
                        перейти
                      </BottomPageNavigationText>
                    </PageNavigationLink>
                  </PageNavigationItem>
                ))}
              </PageNavigation>
            </NavigationWrapper>
            {width > 480 && inView && <LoopyLineIcon />}
          </NavAnimationWrapper>
        </Box>
      </ExamCenterSection>
    </ExamCenterBackground>
  );
};
