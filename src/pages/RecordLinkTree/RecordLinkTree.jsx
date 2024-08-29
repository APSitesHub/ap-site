import axios from 'axios';
import { LinkTreeBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  SocialsLinkWrapperRecord,
  Title,
  FacebookBtnNew,
  InstagramBtnNew,
  TikTokBtnNew,
  YouTubeBtnNew,
  TwitchBtnNew,
} from './RecordLinkTree.styled';
import { SocialLogoLink } from 'components/MainFooter/MainFooter.styled';
import { useEffect } from 'react';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const RecordLinkTree = () => {
  useEffect(() => {
    document.title = 'Record Links | AP Education';
  }, []);

  return (
    <>
      <LinkTreeBackgroundWrapper>
        <BackgroundFilterTop />
        <BackgroundFilterBottom />
        <Title>{`Приєднуйтесь до найдовшого уроку та приймайте участь у встановленні рекорду України!`}</Title>
        <SocialsLinkWrapperRecord>
          <SocialLogoLink
            href="https://www.youtube.com/live/hjoQbERwvHU"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeBtnNew />
          </SocialLogoLink>

          <SocialLogoLink
            href="https://www.facebook.com/ap.edu.centre/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.twitch.tv/ap_education"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitchBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.instagram.com/ap.education/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.tiktok.com/@ap_people/live"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokBtnNew />
          </SocialLogoLink>
        </SocialsLinkWrapperRecord>
      </LinkTreeBackgroundWrapper>
    </>
  );
};

export default RecordLinkTree;
