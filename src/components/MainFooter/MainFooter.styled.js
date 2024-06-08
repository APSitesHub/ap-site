import { LeadBtn, Logo } from 'components/Menu/Menu.styled';
import styled from 'styled-components';

import { PiMapPinDuotone } from 'react-icons/pi';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as LogoNewIcon } from '../../img/svg/logoNewWhite.svg';
import { ReactComponent as LogoSchoolWhite } from '../../img/svg/logoSchoolWhite.svg';
import { ReactComponent as LogoUniversityWhite } from '../../img/svg/logoUniversityWhite.svg';
import { ReactComponent as MonoIcon } from '../../img/svg/monoPaw.svg';
import { ReactComponent as MonoIconWhite } from '../../img/svg/monoPawWhite.svg';
import { ReactComponent as FacebookIcon } from '../../img/svg/social-links/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../img/svg/social-links/instagram.svg';
import { ReactComponent as TikTokIcon } from '../../img/svg/social-links/tiktok.svg';
import { ReactComponent as YouTubeIcon } from '../../img/svg/social-links/youtube.svg';
import { ReactComponent as FacebookIconNew } from '../../img/svg/social-links/facebook-outline.svg';
import { ReactComponent as InstagramIconNew } from '../../img/svg/social-links/instagram-outline.svg';
import { ReactComponent as TikTokIconNew } from '../../img/svg/social-links/tiktok-outline.svg';
import { ReactComponent as YouTubeIconNew } from '../../img/svg/social-links/youtube-outline.svg';

export const Footer = styled.footer`
  background-color: var(--secondary-color);
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

export const FooterNew = styled.footer`
  background-color: var(--main-color);
  font-family: var(--new-font-family);
`;
export const FooterSchool = styled(FooterNew)`
  background-color: var(--school-color);
`;
export const FooterUniversity = styled(FooterNew)`
  background-color: var(--university-color);
`;

export const FooterBox = styled.div`
  padding: 30px 32px;

  @media screen and (min-width: 768px) {
    padding: 36px 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 40px 55px;
  }
`;

export const FooterBoxNew = styled.div`
  padding: 50px 22px;

  @media screen and (min-width: 768px) {
    padding: 100px 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 150px 60px;
  }
`;

export const FooterLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (min-width: 768px) {
    gap: 88px;
  }

  @media screen and (min-width: 1280px) {
    gap: 117px;
  }
`;

export const IconBox = styled.div`
  @media screen and (min-width: 1280px) {
    display: flex;
    align-items: center;
    gap: 96px;
    margin-bottom: 20px;
  }
`;

export const FooterLogoLink = styled(Link)`
  display: inline;
  text-decoration: none;
`;

export const SocialLogoLink = styled.a`
  text-decoration: none;
`;

export const LogoRoute = styled(Link)`
  text-decoration: none;
`;

export const LogoNew = styled(LogoNewIcon)`
  z-index: 10;
  width: 264px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${LogoRoute}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }
`;

export const FooterLogo = styled(Logo)`
  width: 60px;
  display: block;
  flex-shrink: 0;
  margin: 0 auto;
  margin-bottom: 30px;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${FooterLogoLink}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }

  @media screen and (min-width: 768px) {
    width: 64px;
  }

  @media screen and (min-width: 1280px) {
    margin-bottom: 0;
  }
`;

export const FooterLogoNew = styled(LogoNewIcon)`
  width: 264px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${FooterLogoLink}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }

  @media screen and (min-width: 768px) {
    width: 216px;
  }

  @media screen and (min-width: 1280px) {
    width: 372px;
  }
`;

export const FooterLogoSchool = styled(LogoSchoolWhite)`
  width: 264px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${FooterLogoLink}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }

  @media screen and (min-width: 768px) {
    width: 216px;
  }

  @media screen and (min-width: 1280px) {
    width: 372px;
  }
`;

export const FooterLogoUniversity
 = styled(LogoUniversityWhite)`
  width: 264px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${FooterLogoLink}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }

  @media screen and (min-width: 768px) {
    width: 216px;
  }

  @media screen and (min-width: 1280px) {
    width: 372px;
  }
`;

export const FooterSocials = styled.div`
  display: flex;
  width: max-content;
  gap: 25px;
  margin: 0 auto;
  margin-bottom: 36px;
  align-items: center;

  @media screen and (min-width: 1280px) {
    margin-bottom: 0;
  }
`;

export const SocialsLinkWrapperNew = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  gap: 16px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    margin-left: auto;
    margin-top: 47px;
    margin-bottom: 0;
  }

  @media screen and (min-width: 1280px) {
    margin-top: 86px;
  }
`;

const socialBtnStyles =
  'fill: var(--accent-color); width: 40px; height: 40px; transition: fill var(--animation-global), transform var(--animation-global), filter var(--animation-global); ';

const socialBtnStylesOnHover =
  'fill: var(--main-color);  transform: scale(1.2);  filter: drop-shadow(0px 0px 0.5px #00000054);';

export const InstagramBtn = styled(InstagramIcon)`
  ${socialBtnStyles}

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const FacebookBtn = styled(FacebookIcon)`
  ${socialBtnStyles}

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const TikTokBtn = styled(TikTokIcon)`
  ${socialBtnStyles}

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const YouTubeBtn = styled(YouTubeIcon)`
  ${socialBtnStyles}

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

const socialBtnStylesNew =
  'color: #fff; width: 30px; height: 30px; transition: color var(--animation-global), transform var(--animation-global), filter var(--animation-global); ';

const socialBtnStylesFullHDNew = 'width: 40px; height: 40px;';

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

export const MonoPawIcon = styled(MonoIcon)`
  height: 40px;
  width: 140px;
`;

export const MonoPawIconWhite = styled(MonoIconWhite)`
  height: 40px;
  width: 140px;

  @media screen and (min-width: 768px) {
    height: 27px;
    width: 91px;
  }

  @media screen and (min-width: 1280px) {
    height: 45px;
    width: 155px;
  }
`;

export const LeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    gap: 20px;
  }

  @media screen and (min-width: 1280px) {
    align-items: start;
    gap: 22px;
    margin: 0;
  }
`;

export const LeadWrapperNew = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    gap: 20px;
  }

  @media screen and (min-width: 1280px) {
    align-items: start;
    gap: 21px;
    margin: 0;
  }
`;

export const LeadSocialWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const LeadDesc = styled.p`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--main-color);
  letter-spacing: 1.8px;

  @media screen and (min-width: 768px) {
    font-weight: 600;
  }

  @media screen and (min-width: 1280px) {
    font-size: 22px;
    text-align: left;
  }
`;

export const LeadDescNew = styled.p`
  font-size: 14px;
  font-family: var(--new-font-family);
  color: var(--secondary-color);

  @media screen and (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const FooterLeadBtnNew = styled.button`
  display: block;
  width: 265px;
  height: 58px;
  padding: 19px 20px;
  font-size: 16px;
  font-weight: 700;

  background-color: transparent;

  color: #fff;
  text-transform: uppercase;
  border: 2px solid #fff;
  border-radius: 50px;

  @media screen and (min-width: 360px) {
    max-width: 450px;
  }

  @media screen and (min-width: 1280px) {
    margin: 0;
    margin-left: 8px;
    width: 230px;
  }

  text-align: center;
  position: relative;
  outline: transparent;
  transition: box-shadow var(--animation-global),
    transform var(--animation-global);
`;

export const FooterLeadBtn = styled(LeadBtn)`
  padding: 0;
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (min-width: 1280px) {
    gap: 63px;
    padding-bottom: 0;
  }
`;

export const FooterListNew = styled.ul`
  display: flex;
  flex-direction: column;
  color: var(--secondary-color);
  gap: 32px;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding-bottom: 0;
    gap: 24px;
  }

  @media screen and (min-width: 1280px) {
    gap: 60px;
  }
`;

export const FooterListItem = styled.li`
  margin: 0 auto;
`;

export const FooterListItemNew = styled.li``;

export const LinkListTitle = styled.h4`
  text-align: center;
  color: var(--main-color);
  font-size: 28px;
  letter-spacing: 1.4px;
  margin-bottom: 8px;
  -webkit-text-stroke: 0.5px var(--main-color);

  @media screen and (min-width: 768px) {
    margin-bottom: 14px;
  }

  @media screen and (min-width: 1280px) {
    margin-bottom: 20px;
    text-align: left;
  }
`;

export const LinkListTitleNew = styled.h4`
  text-transform: uppercase;
  color: var(--secondary-color);
  font-size: 16px;
  letter-spacing: 1.4px;
  margin-bottom: 16px;

  @media screen and (min-width: 1280px) {
    margin-bottom: 21px;
    font-size: 22px;
    text-align: left;
  }
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 140px;

  @media screen and (min-width: 1280px) {
    max-width: 200px;
  }
`;

export const LinkListNew = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkListItem = styled.li`
  text-align: center;
  font-size: 22px;
  -webkit-text-stroke: 0.2px var(--main-color);

  @media screen and (min-width: 768px) {
    letter-spacing: 1px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 20px;
    text-align: left;
    -webkit-text-stroke: 0.5px var(--main-color);
  }
`;

export const LinkListItemNew = styled.li`
  font-size: 14px;

  @media screen and (min-width: 1280px) {
    font-size: 20px;
  }
`;

export const FooterNavLink = styled(NavLink)`
  position: relative;
  color: var(--main-color);
  cursor: pointer;
  text-decoration: none;
  transition: color var(--animation-global),
    -webkit-text-stroke var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
    -webkit-text-stroke: 0.2px var(--accent-color);

    @media screen and (min-width: 1280px) {
      -webkit-text-stroke: 0.5px var(--accent-color);
    }
  }

  &.active {
    color: var(--accent-color);
    -webkit-text-stroke: 0.2px var(--accent-color);

    @media screen and (min-width: 1280px) {
      -webkit-text-stroke: 0.5px var(--accent-color);
    }
  }
`;

export const FooterNavLinkNew = styled(NavLink)`
  position: relative;
  color: var(--secondary-color);
  cursor: pointer;
  opacity: 0.6;
  text-decoration: none;
  transition: color var(--animation-global), opacity var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
    opacity: 1;
  }

  &.active {
    color: var(--accent-color);
    opacity: 1;
  }
`;

export const FooterLink = styled.a`
  position: relative;
  color: var(--main-color);
  cursor: pointer;
  text-decoration: none;
  transition: color var(--animation-global),
    -webkit-text-stroke var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
    -webkit-text-stroke: 0.2px var(--accent-color);

    @media screen and (min-width: 1280px) {
      -webkit-text-stroke: 0.5px var(--accent-color);
    }
  }
`;

export const FooterLinkNew = styled.a`
  position: relative;
  color: var(--secondary-color);
  cursor: pointer;
  opacity: 0.6;
  text-decoration: none;
  transition: color var(--animation-global), opacity var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
    opacity: 1;
  }
`;

export const MapPointer = styled(PiMapPinDuotone)`
  width: 30px;
  height: 30px;
`;

export const FooterCopyright = styled.p`
  color: var(--main-color);
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

export const FooterCopyrightNew = styled.span`
  color: var(--secondary-color);
  font-size: 12px;

  @media screen and (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const FooterTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  @media screen and (min-width: 1280px) {
    margin-bottom: 32px;
  }
`;

export const FooterBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
  padding-top: 20px;

  border-top: 1px solid #00000010;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const FooterBottomContainerNew = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  padding-top: 20px;

  border-top: 1px solid #ffffff29;

  margin-bottom: 16px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  font-size: 18px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const FooterLinksContainerNew = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  font-size: 18px;

  @media screen and (min-width: 1280px) {
    gap: 20px;
  }
`;

export const FooterFileLink = styled(Link)`
  color: var(--main-color);
  cursor: pointer;
  text-decoration: none;
  transition: color var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const FooterFileLinkNew = styled(Link)`
  color: var(--secondary-color);
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: color var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
  }

  @media screen and (min-width: 1280px) {
    font-size: 16px;
  }
`;
