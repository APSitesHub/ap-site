import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../img/svg/logoNew.svg';
import { ReactComponent as QuizletIcon } from '../../img/svg/quizlet.svg';
import { ReactComponent as QuizletMobileIcon } from '../../img/svg/quizlet-short.svg';
import { ReactComponent as YoutubeIcon } from '../../img/svg/youtube.svg';
import { ReactComponent as ExternalLink } from '../../img/svg/externalLink.svg';
import { Link } from 'react-router-dom';

export const GiftsBox = styled.ul`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  font-family: var(--main-font-family);
  padding: 40px 20px;

  overflow: hidden;

  @media screen and (min-width: 768px) {
    max-width: 1024px;
    margin: 0 auto;
  }
`;

export const GiftsBoxItem = styled.li`
  color: #000;
  border-bottom: 1px solid #0000000d;
  padding-top: 8px;
  padding-bottom: 8px;

  &:has(div.minimized) {
    border-bottom: none;
    padding: 0;
  }
`;

export const Logo = styled(LogoIcon)`
  display: block;
  flex-shrink: 0;
  width: 200px;
  height: 40px;

  margin: 48px auto;
`;

export const SubTitle = styled.p`
  text-align: center;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 30px;

  @media screen and (min-width: 480px) {
    font-size: 16px;
  }

  @media screen and (min-width: 768px) {
    font-size: 18px;
    padding: 0 40px;
    max-width: 600px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 55px;
    max-width: 900px;
  }
`;

export const QuizletLogo = styled(QuizletIcon)`
  display: block;
  flex-shrink: 0;
  width: 100px;
  color: #4255ff;
  transition: color var(--animation-global);

  a:hover &,
  a:focus & {
    color: var(--accent-color);
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const QuizletShortLogo = styled(QuizletMobileIcon)`
  display: block;
  flex-shrink: 0;
  width: 32px;
  color: #4255ff;
  transition: color var(--animation-global);

  a:hover &,
  a:focus & {
    color: var(--accent-color);
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const YouTubeLogo = styled(YoutubeIcon)`
  display: block;
  flex-shrink: 0;
  width: 43px;
  height: 30px;
`;

export const QuizletLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  width: 100%;
  font-size: 16px;
  color: #000;
  text-decoration: none;
  gap: 12px;

    @media screen and (min-width: 480px) {
    gap: 16px;
  }
`;

export const GiftLinkIcon = styled(ExternalLink)`
  display: block;
  flex-shrink: 0;
  margin-left: auto;
  pointer-events: none;
  transition: color var(--animation-global);

  a:hover &,
  a:focus & {
    color: var(--accent-color);
  }
`;

export const GiftsDescription = styled.p`
  font-size: 12px;
  transform: translateY(2px);

  @media screen and (min-width: 480px) {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const GiftsVideoBox = styled.div`
  transform: scaleY(1);
  transform-origin: top;
  height: auto;
  transition: transform var(--animation-global);

  &.minimized {
    transform: scaleY(0);
    height: 0;
  }
`;

export const PdfPreviewBackground = styled.div`
  background-color: #303030;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 3px;
  height: 0;
  min-height: 0;
  opacity: 0;

  transform: scaleY(0);
  transform-origin: top;
  transition: transform 350ms linear, height 350ms linear,
    min-height 350ms linear, opacity 350ms linear;

  &:not(:last-child) {
    margin-bottom: 3px;
  }

  &.preview-open {
    opacity: 1;

    height: auto;
    min-height: 150px;
    transform: scaleY(1);
    transition: transform 350ms linear, height 350ms linear;

    @media screen and (min-width: 480px) {
      height: 250px;
      min-height: 250px;
    }

    @media screen and (min-width: 640px) {
      height: 350px;
      min-height: 350px;
    }

    @media screen and (min-width: 768px) {
      height: 450px;
      min-height: 450px;
    }

    & iframe {
      height: 100%;
    }
  }
`;

export const PdfPreview = styled.iframe`
  width: 100%;
  height: 0px;
  display: block;

  transition: transform 350ms linear, height 350ms linear;
`;
