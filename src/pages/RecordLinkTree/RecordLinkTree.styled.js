import styled from 'styled-components';
import { ReactComponent as FacebookIconNew } from '../../img/svg/social-links/facebook-outline-bold.svg';
import { ReactComponent as InstagramIconNew } from '../../img/svg/social-links/instagram-outline-bold.svg';
import { ReactComponent as TikTokIconNew } from '../../img/svg/social-links/tiktok-outline-bold.svg';
import { ReactComponent as YouTubeIconNew } from '../../img/svg/social-links/youtube-outline-bold.svg';
import { ReactComponent as TwitchIconNew } from '../../img/svg/social-links/twitch-outline.svg';
import { SocialLogoLink } from 'components/MainFooter/MainFooter.styled';

export const BackgroundFilterTop = styled.div`
  position: absolute;
  top: -602px;
  right: -385px;

  width: 602px;
  height: 602px;
  flex-shrink: 0;

  border-radius: 602px;
  background-color: #0f645b;

  filter: drop-shadow(10px 10px 150px #0f645b);

  @media screen and (min-width: 768px) {
    filter: drop-shadow(10px 10px 250px #0f645b);
  }

  @media screen and (min-width: 1280px) {
    filter: drop-shadow(10px 10px 350px #0f645b);
  }
  
`;

export const BackgroundFilterBottom = styled(BackgroundFilterTop)`
  top: unset;
  right: unset;
  bottom: -300px;
  left: -625px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  line-height: 1.2;

  margin: 0 auto;
  margin-top: 32vh;
  margin-bottom: 28px;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    margin-top: 30vh;
    font-size: 28px;
    max-width: 640px;
  }
`;

export const SocialsLinkWrapperRecord = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  gap: 16px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const socialBtnStylesNew =
  'color: var(--main-color); width: 40px; height: 40px; transition: color var(--animation-global), transform var(--animation-global), filter var(--animation-global); ';

const socialBtnStylesFullHDNew = 'width: 50px; height: 50px;';

const socialBtnStylesOnHoverNew =
  'color: var(--accent-color);  transform: scale(1.2);  filter: drop-shadow(0px 0px 0.5px #00000054);';

export const InstagramBtnNew = styled(InstagramIconNew)`
  ${socialBtnStylesNew}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesFullHDNew}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHoverNew}
  }
`;

export const FacebookBtnNew = styled(FacebookIconNew)`
  ${socialBtnStylesNew}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesFullHDNew}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHoverNew}
  }
`;

export const TikTokBtnNew = styled(TikTokIconNew)`
  ${socialBtnStylesNew}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesFullHDNew}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHoverNew}
  }
`;

export const YouTubeBtnNew = styled(YouTubeIconNew)`
  ${socialBtnStylesNew}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesFullHDNew}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHoverNew}
  }
`;

export const TwitchBtnNew = styled(TwitchIconNew)`
  ${socialBtnStylesNew}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesFullHDNew}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHoverNew}
  }
`;