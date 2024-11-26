import { Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import thankYouPersonPNG from '../../img/bg/thank-you-person.png';
import thankYouPersonWebp from '../../img/bg/thank-you-person.webp';
import blurEllipsePNG from '../../img/bg/thank-you.png';
import blurEllipseWebp from '../../img/bg/thank-you.webp';
import { ReactComponent as PhoneIcon } from '../../img/svg/call.svg';
import { ReactComponent as HeroStarIcon } from '../../img/svg/heroStar.svg';
import { ReactComponent as LogoWhite } from '../../img/svg/logoWhite.svg';
import { ReactComponent as LogoWhiteMobile } from '../../img/svg/logoWhiteMobile.svg';
import { ReactComponent as FacebookIcon } from '../../img/svg/social-links/facebook_new.svg';
import { ReactComponent as InstagramIcon } from '../../img/svg/social-links/instagram_new.svg';
import { ReactComponent as TikTokIcon } from '../../img/svg/social-links/tiktok_new.svg';
import { ReactComponent as YouTubeIcon } from '../../img/svg/social-links/youtube_new.svg';
import { ReactComponent as LinkedInIcon } from '../../img/svg/social-links/linkedin_new.svg';
import { ReactComponent as TextBubbleIcon } from '../../img/svg/text-bubble.svg';
import { ReactComponent as ThankYouArrowLongIcon } from '../../img/svg/ty-arrow-long.svg';
import { ReactComponent as ThankYouArrowIcon } from '../../img/svg/ty-arrow.svg';

export const PageForm = styled(Form)`
  position: relative;
  z-index: 1;
  background-color: white;
  padding: 32px 15px;
  border-radius: 16px;
  overflow-x: hidden;

  width: 100%;
  max-width: 375px;
  margin: 0 auto;

  font-family: var(--new-font-family);

  @media screen and (min-width: 768px) {
    max-width: 480px;
  }

  @media screen and (min-width: 1280px) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    max-width: 538px;
    padding: 60px 40px;
  }

  @media screen and (min-width: 1920px) {
    max-width: 634px;
    padding: 60px 50px;
  }
`;

export const PageFormHeading = styled.h1`
  position: relative;
  z-index: 1;
  color: var(--secondary-color);
  font-size: 29px;
  text-align: center;
  margin-bottom: 16px;

  @media screen and (min-width: 1280px) {
    text-align: start;
    font-size: 40px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 60px;
  }
`;

export const PageFormWrapper = styled.div`
  position: relative;
  max-width: 375px;
  margin: 0 auto;
  height: 100%;

  @media screen and (min-width: 768px) {
    max-width: 480px;
  }

  @media screen and (min-width: 1280px) {
    width: 100%;
    max-width: none;
  }
`;

export const UnFormTextContent = styled.div`
  @media screen and (min-width: 1280px) {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    max-width: 538px;
  }

  @media screen and (min-width: 1920px) {
    max-width: 805px;
  }
`;

export const PageFormPicture = styled.picture`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
    height: auto;
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const FormBackground = styled.main`
  background-color: #000;
  min-height: 100vh;
  font-family: var(--new-font-family);
`;

export const ThankYouHeader = styled.header`
  position: fixed;

  font-family: var(--new-font-family);

  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 0 20px;
  height: 44px;
  background-color: var(--secondary-color);
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 3px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform var(--animation-global);

  @media screen and (min-width: 400px) {
    padding: 0 30px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 42px;
    height: 60px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 120px;
  }

  &.hidden {
    transform: translateY(-90px);
  }

  &.shown {
    transform: translateY(0px);
  }
`;

export const ThankYouHeaderNew = styled.header`
  position: fixed;

  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 0 20px;
  height: 66px;
  background-color: transparent;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform var(--animation-global);

  @media screen and (min-width: 400px) {
    padding: 0 30px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 60px;
    height: 100px;
    border-bottom: none;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 120px;
  }

  &.scrolled {
    background: linear-gradient(
      323deg,
      #0f645bee 0%,
      #000000ee 47%,
      #0f645bee 100%
    );
  }

  &.hidden {
    transform: translateY(-90px);
  }

  &.shown {
    transform: translateY(0px);
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled(LogoWhite)`
  z-index: 10;
  width: 190px;
  display: none;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 768px) {
    display: block;
  }

  & path#star {
    fill: white;
    transition: fill var(--animation-global);
  }

  &:hover,
  &:focus {
    & path#star {
      fill: var(--main-color);
    }
  }
`;

export const LogoMobile = styled(LogoWhiteMobile)`
  z-index: 10;
  width: 66px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const PhoneNumber = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--secondary-color);
  transition: color var(--animation-global);

  @media screen and (min-width: 768px) {
    gap: 8px;
  }

  &:hover,
  &:focus {
    color: var(--main-color);
  }
`;

export const ThankYouSectionNew = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 116px 20px 50px 20px;

  font-family: var(--new-font-family);

  @media screen and (min-width: 1280px) {
    padding: 86px 73px;
    height: 100vh;
  }

  @media screen and (min-width: 1920px) {
    padding-top: 60px;
    padding-left: 120px;
    padding-bottom: 70px;
    padding-right: 120px;
  }
`;

export const ThankYouSection = styled.section`
  position: relative;
  overflow: hidden;

  padding: 96px 20px 52px 20px;

  background-position: left -485px bottom -60px, right -485px top 100px,
    right 28px center;
  background-image: image-set(
      url(${blurEllipseWebp}) type('image/webp'),
      url(${blurEllipsePNG}) type('image/png')
    ),
    image-set(
      url(${blurEllipseWebp}) type('image/webp'),
      url(${blurEllipsePNG}) type('image/png')
    );
  background-size: 602px 602px, 602px 602px, 429px 429px;
  background-repeat: no-repeat, no-repeat;

  font-family: var(--new-font-family);

  @media screen and (min-width: 768px) {
    min-height: 100vh;
  }

  @media screen and (min-width: 1280px) {
    padding-top: 60px;
    padding-left: 120px;
    padding-bottom: 70px;
    padding-right: 0;

    height: 100vh;
    background-position: left -715px center, right -715px center,
      right 28px center;
    background-image: image-set(
        url(${blurEllipseWebp}) type('image/webp'),
        url(${blurEllipsePNG}) type('image/png')
      ),
      image-set(
        url(${blurEllipseWebp}) type('image/webp'),
        url(${blurEllipsePNG}) type('image/png')
      ),
      image-set(
        url(${thankYouPersonWebp}) type('image/webp'),
        url(${thankYouPersonPNG}) type('image/png')
      );
    background-size: 975px 975px, 975px 975px, 612px 612px;
    background-repeat: no-repeat, no-repeat;
  }

  @media screen and (min-width: 1920px) {
    background-position: left -715px center, right -715px center,
      right 89px center;
    background-image: image-set(
        url(${blurEllipseWebp}) type('image/webp'),
        url(${blurEllipsePNG}) type('image/png')
      ),
      image-set(
        url(${blurEllipseWebp}) type('image/webp'),
        url(${blurEllipsePNG}) type('image/png')
      ),
      image-set(
        url(${thankYouPersonWebp}) type('image/webp'),
        url(${thankYouPersonPNG}) type('image/png')
      );
    background-size: 975px 975px, 975px 975px, 798px 798px;
    background-repeat: no-repeat, no-repeat;
  }
`;

export const ThankYouPicture = styled.picture`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
    height: auto;
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const ThankYouImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  margin-bottom: 60px;

  @media screen and (max-width: 359px) {
    margin-bottom: 120px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    max-width: 520px;
  }

  @media screen and (min-width: 960px) {
    max-width: 640px;
  }
`;

export const ThankYouTextWrapper = styled.div`
  position: relative;
  max-width: 360px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 60px;

    max-width: 400px;
  }

  @media screen and (min-width: 1280px) {
    position: absolute;
    top: 30%;
    left: 120px;
    transform: unset;

    max-width: 643px;
  }

  @media screen and (min-width: 1920px) {
    max-width: 805px;
  }
`;

export const ThankYouHeading = styled.h1`
  font-size: 30px;
  text-align: center;

  margin-bottom: 8px;

  @media screen and (min-width: 1280px) {
    font-size: 40px;
    line-height: 1.2;
    font-weight: 700;
  }

  @media screen and (min-width: 1920px) {
    font-size: 50px;
  }
`;

export const ThankYouDesc = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;

  @media screen and (min-width: 1280px) {
    text-align: start;
    font-size: 18px;
    margin-bottom: 80px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 24px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    gap: 8px;
  }

  @media screen and (min-width: 1920px) {
    gap: 24px;
  }
`;

export const MainLinkBtn = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  color: #fff;

  width: 100%;
  max-width: 360px;

  padding: 20px 60px;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  border-radius: 50px;
  font-family: var(--new-font-family);
  color: var(--secondary-color);
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.48px;

  @media screen and (min-width: 1280px) {
    width: auto;
  }

  @media screen and (min-width: 1920px) {
    flex-direction: row;
    font-size: 20px;
    letter-spacing: 0.6px;
  }
`;

export const LinkBtn = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  color: #000;

  width: 100%;
  max-width: 360px;

  font-size: 16px;
  font-weight: 700;

  padding: 20px 45px;
  border-radius: 50px;
  line-height: 1;
  letter-spacing: 0.48px;
  border: 2px var(--main-color) solid;

  @media screen and (min-width: 1280px) {
    width: auto;
  }

  @media screen and (min-width: 1920px) {
    padding: 20px 60px;
    font-size: 20px;
    letter-spacing: 0.6px;
  }
`;

export const SocialsBoxNewMobile = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  margin-top: 40px;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const SocialsBoxNew = styled.div`
  display: none;

  @media screen and (min-width: 1280px) {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const SocialsBox = styled.div`
  position: absolute;
  bottom: 52px;
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  max-width: 240px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    gap: 40px;
    left: 120px;
    transform: translateX(0%);
    max-width: unset;
  }

  @media screen and (min-width: 1920px) {
    bottom: 180px;
  }
`;

export const SocialsTextNew = styled.p`
  color: var(--secondary-color);
  text-align: center;
  font-size: 14px;

  @media screen and (min-width: 1280px) {
    text-align: start;
    font-size: 21px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 32px;
  }
`;

export const SocialsText = styled.p`
  @media screen and (max-width: 767px) {
    display: none;
  }

  @media screen and (min-width: 768px) {
    text-align: center;
    font-size: 16px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 20px;
  }
`;

export const SocialsLinkWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
`;

export const SocialLogoLink = styled.a`
  position: relative;
  overflow: hidden;
  width: 45px;
  height: 45px;

  border-radius: 50%;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%);

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1280px) {
    width: 70px;
    height: 70px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity 350ms linear;

    background: linear-gradient(322deg, #09c6cc 22.22%, #0f645b 100%), #0f645b;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const ContactPhone = styled(PhoneIcon)`
  stroke: currentColor;
  width: 15px;
  height: 15px;

  @media screen and (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const ContactPhoneNumber = styled.span`
  font-family: var(--new-font-family);
  font-size: 14.5px;
  line-height: 1;
  transform: translateY(2px);

  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const socialBtnStyles =
  'color: #fff; width: 24px; height: 24px; transition: color var(--animation-global), transform var(--animation-global), filter var(--animation-global); position: relative; z-index: 2;';

const socialBtnStylesHD = 'width: 35px; height: 35px;';

const socialBtnStylesOnHover =
  'color: var(--accent-color);  transform: scale(1.2);  filter: drop-shadow(0px 0px 0.5px #00000054);';

export const InstagramBtn = styled(InstagramIcon)`
  ${socialBtnStyles}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesHD}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const FacebookBtn = styled(FacebookIcon)`
  ${socialBtnStyles}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesHD}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const TikTokBtn = styled(TikTokIcon)`
  ${socialBtnStyles}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesHD}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const YouTubeBtn = styled(YouTubeIcon)`
  ${socialBtnStyles}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesHD}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const LinkedInBtn = styled(LinkedInIcon)`
  ${socialBtnStyles}

  @media screen and (min-width: 1280px) {
    ${socialBtnStylesHD}
  }

  ${SocialLogoLink}:hover & {
    ${socialBtnStylesOnHover}
  }
`;

export const HeroTopStar = styled(HeroStarIcon)`
  position: absolute;
  left: 11.7%;
  top: 60%;

  width: 32px;
  height: 32px;

  @media screen and (min-width: 768px) {
    top: 20%;
    right: 35%;
    left: unset;
    bottom: unset;

    width: 40px;
    height: 40px;
  }

  @media screen and (min-width: 1280px) {
    top: 91px;
    right: 38.8%;

    width: 48px;
    height: 48px;
  }

  @media screen and (min-width: 1440px) {
    top: 152px;
    right: 40%;

    width: 60px;
    height: 60px;
  }
`;

export const HeroBottomStar = styled(HeroStarIcon)`
  position: absolute;
  bottom: 198px;
  right: -36px;

  width: 72px;
  height: 72px;

  @media screen and (min-width: 1280px) {
    bottom: 52px;
    right: 135px;

    width: 81px;
    height: 81px;
  }

  @media screen and (min-width: 1920px) {
    bottom: 129px;
    right: 185px;

    width: 111px;
    height: 111px;
  }
`;

export const ThankYouArrow = styled(ThankYouArrowIcon)`
  @media screen and (max-width: 767px) {
    display: none;
  }

  position: absolute;
  right: -10px;
  bottom: 185px;

  width: 23px;
  height: 81px;
  transform: rotate(-10deg);

  @media screen and (min-width: 1280px) {
    right: -35px;
    bottom: 56px;

    width: 32px;
    height: 115px;
    transform: rotate(-26deg);
  }

  @media screen and (min-width: 1920px) {
    right: -50px;
    bottom: 33px;

    width: 42px;
    height: 151px;
    transform: rotate(-12deg);
  }
`;

export const SocialArrow = styled(ThankYouArrowLongIcon)`
  position: absolute;
  bottom: 77px;
  right: -48.5px;

  width: 67px;
  height: 240px;

  @media screen and (max-width: 359px) {
    right: -30px;
  }

  @media screen and (min-width: 420px) {
    bottom: calc(77px + 2vh);
  }

  @media screen and (min-width: 480px) {
    bottom: calc(77px + 5vh);
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const TextBubbleWrapper = styled.div`
  position: absolute;
  right: -38px;
  bottom: 325.5px;

  width: 148px;
  height: 45px;

  @media screen and (min-width: 420px) {
    bottom: calc(325.5px + 6vh);
  }

  @media screen and (min-width: 480px) {
    bottom: calc(325.5px + 10vh);
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const TextBubble = styled(TextBubbleIcon)`
  width: 100%;
  filter: drop-shadow(0.97px 1.29px 1.29px #00000040)
    drop-shadow(-0.97px -0.64px 2.26px #0000001a);
`;

export const TextBubbleText = styled.p`
  font-family: FixelVariable;
  font-size: 12px;
  font-style: italic;

  line-height: 1.2;
  text-align: center;
  position: absolute;
  top: calc(50% - 2px);
  transform: translateY(-50%);
  z-index: 5;
`;

export const LeadFormAddText = styled.p`
  text-align: center;
  font-size: 16px;
  margin-bottom: 12px;

  @media screen and (min-width: 1280px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 20px;
  }
`;

export const LeadFormAddTextNew = styled(LeadFormAddText)`
  position: relative;
  z-index: 1;
  color: var(--secondary-color);
  margin-bottom: 32px;

  @media screen and (min-width: 1280px) {
    text-align: start;
    font-size: 24px;
    margin-bottom: 100px;
  }

  @media screen and (min-width: 1920px) {
    font-size: 32px;
  }
`;

export const BackgroundFilterTopLeft = styled.div`
  position: absolute;
  top: 0;
  left: -602px;

  width: 602px;
  height: 602px;
  flex-shrink: 0;
  rotate: 90deg;

  border-radius: 50%;
  background-color: #0f645b;
  filter: drop-shadow(-25px -95px 85px #0f645b);

  @media screen and (min-width: 1280px) {
    width: 1407px;
    height: 1407px;

    left: -1407px;

    filter: drop-shadow(-25px -374px 285px #0f645b);
  }
`;

export const BackgroundFilterTopRight = styled(BackgroundFilterTopLeft)`
  left: unset;
  right: -602px;
  filter: drop-shadow(-125px 95px 85px #0f645b);

  @media screen and (min-width: 1280px) {
    width: 1318px;
    height: 1318px;

    right: -1318px;

    filter: drop-shadow(-225px 145px 285px #0f645b);
  }
`;

export const BackgroundFilterBottom = styled(BackgroundFilterTopLeft)`
  top: unset;
  right: unset;
  bottom: -602px;
  left: 33%;
  filter: drop-shadow(-125px 95px 115px #0f645b);

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const FormBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 100%;
  position: relative;
  overflow: hidden;

  padding: 20px;
  font-size: 16px;
  font-weight: 700;

  text-transform: uppercase;
  color: var(--secondary-color);
  border-radius: 50px;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  border: none;
  flex-shrink: 0;
  cursor: pointer;

  outline: transparent;

  @media screen and (min-width: 768px) {
    font-size: 20px;
    letter-spacing: 0.6px;
    height: 70px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity 350ms linear;

    background: linear-gradient(322deg, #09c6cc 22.22%, #0f645b 100%), #0f645b;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const FormBtnText = styled.span`
  position: relative;
  z-index: 1;
`;

export const Input = styled(Field)`
  width: 100%;
  height: 50px;
  padding: 18px 20px;
  font-size: 14px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  line-height: 1;

  @media screen and (min-width: 768px) {
    height: 59px;
    padding: 20px 40px;
    font-size: 16px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }

  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      -webkit-box-shadow: 0 0 0px 1000px var(--accent-semi-transparent-color)
        inset;
    }
  }

  &::placeholder {
  }
`;
