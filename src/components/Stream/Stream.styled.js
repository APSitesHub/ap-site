import { Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as BoxSwitchLeft } from '../../img/svg/btnbox-switch-left.svg';
import { ReactComponent as BoxSwitchRight } from '../../img/svg/btnbox-switch-right.svg';
import { ReactComponent as KahootIcon } from '../../img/svg/kahootIcon.svg';
import { ReactComponent as InputIcon } from '../../img/svg/teacherQuestion.svg';
import { ReactComponent as LogoClean } from '../../img/svg/myap/logo-clean.svg';
import { ReactComponent as SupportIcon } from '../../img/svg/supportIcon.svg';
// eslint-disable-next-line
import { ReactComponent as SpeakingIcon } from '../../img/svg/speaking.svg';
import { ReactComponent as SpeakingIconOption } from '../../img/svg/speaking2.svg';
import { ReactComponent as SupportArrowIcon } from '../../img/svg/supportIcons/supportArrow.svg';
import { ReactComponent as SupportPointerIcon } from '../../img/svg/supportIcons/supportPointer.svg';
import { ReactComponent as ChatIcon } from '../../img/svg/youTubeChat.svg';

export const StreamSection = styled.section`
  position: relative;
  overflow: hidden;
  height: 100vh;
`;

export const Video = styled.div`
  overflow: hidden;
`;

export const MoldingNoClick = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 35%;
  z-index: 1;

  @media screen and (min-height: 800px) {
    height: 50%;
  }

  @media screen and (min-height: 1200px) {
    height: 65%;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const MoldingNoClickSecondary = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 70%;
  height: calc(65% - 60px);
  z-index: 1;
  display: block;

  @media screen and (max-width: 767px) {
    display: none;
  }

  @media screen and (min-height: 800px) {
    height: calc(50% - 60px);
  }

  @media screen and (min-height: 1200px) {
    height: calc(35% - 60px);
  }
`;

export const pulse = keyframes`
  0%{
    transform: scale(0.9);
  }
  100%{
    transform: scale(1.1);
  }
`;

export const SupportMarkerRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 250px;
  height: 40px;
  pointer-events: none;
  z-index: 10;

  background: transparent;
  background-clip: padding-box;

  &:before {
    content: '';
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &.animated:before {
    content: '';
    z-index: -1;
    position: absolute;
    display: block;
    width: 100%;
    height: 150%;

    filter: blur(10px);
    opacity: 0.5;
    background: linear-gradient(360deg, var(--main-color), #f9ea38);
  }
`;

export const SupportMarkerLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 240px;
  height: 40px;
  pointer-events: none;
  z-index: 10;

  &:before {
    content: '';
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &.animated:before {
    content: '';
    z-index: -1;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;

    filter: blur(10px);
    opacity: 0.5;
    background: linear-gradient(360deg, var(--main-color), #f9ea38);
  }
`;

export const VideoBox = styled.div`
  padding-top: 100vh;
  max-height: 100vh;
  overflow: hidden;
  box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);

  & iframe {
    border: none;
    display: block;
  }

  transition: all var(--animation-global);
`;

export const ChatBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: max-content;
  min-width: 300px;

  font-family: var(--streams-font-family);
  background-color: var(--chat-background-color);
  box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);

  /* transition: transform var(--animation-global); */

  @media screen and (orientation: portrait) {
    bottom: 0;
    top: auto;
    left: 0;
    right: auto;
    width: 100%;
    height: 38%;
  }

  @media screen and (min-width: 768px) {
    left: auto;
    right: 0;
  }

  & > iframe {
    border: none;
    display: block;
    width: 100%;
    height: 100%;
  }

  &.hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;

    transform: translateX(100%);

    @media screen and (orientation: portrait) {
      transform: translateX(-100%);
    }
  }

  &.shown {
    transform: translateX(0);
  }
`;

export const ChatWindowedBox = styled(ChatBox)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  background-color: #111111e8;
  color: #c9c7c7;

  min-width: auto;
`;

export const ButtonBox = styled.div`
  position: absolute;
  top: 60px;
  left: 25px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 20px;

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(calc(-100% - 30px));
  }

  @media screen and (max-height: 300px) {
    top: 30px;
    gap: 15px;
  }
`;

export const ButtonBoxUni = styled(ButtonBox)`
  top: 125px;

  @media screen and (min-width: 768px) {
    top: 150px;
  }
`;

export const ButtonBoxFree = styled(ButtonBox)`
  top: 50%;
  transform: translateY(-50%);

  &.hidden {
    transform: translate(calc(-100% - 30px), -50%);
  }
`;

export const ChatBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-size: 20px;
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  transition: all var(--animation-global);

  @media screen and (min-width: 1024px) {
    width: 70px;
    height: 70px;
  }

  @media screen and (min-width: 768px) and (orientation: portrait) {
    width: 70px;
    height: 70px;
  }

  &:focus,
  &:hover,
  &:active {
    background-color: var(--accent-color);
    box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);
  }

  &.animated {
    animation: ${pulse} 1000ms infinite ease-in-out alternate;
  }

  &:before {
    content: '';
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &.animated:before {
    content: '';
    z-index: -1;
    position: absolute;
    border-radius: 50%;
    display: block;
    width: 55px;
    height: 55px;
    /* animation: ${pulse} 1000ms infinite ease-in-out alternate; */

    filter: blur(10px);
    opacity: 1;
    background: linear-gradient(360deg, var(--main-color), #f9ea38);

    @media screen and (min-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }
`;

export const KahootBtn = styled(ChatBtn)``;

export const KahootLogo = styled(KahootIcon)`
  width: 25px;
  height: 25px;
  z-index: 5;

  @media screen and (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (min-width: 768px) and (orientation: portrait) {
    width: 40px;
    height: 40px;
  }
`;

export const InputBtn = styled(ChatBtn)`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.48px;
  word-break: break-word;
`;

export const InputLogo = styled(InputIcon)`
  width: 25px;
  height: 25px;
  z-index: 5;

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const ChatLogo = styled(ChatIcon)`
  width: 25px;
  height: 25px;
  z-index: 5;

  @media screen and (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (min-width: 768px) and (orientation: portrait) {
    width: 40px;
    height: 40px;
  }
`;

export const SupportBtn = styled(ChatBtn)``;

export const SupportLogo = styled(SupportIcon)`
  fill: var(--main-color);
  width: 31px;
  height: 31px;
  z-index: 5;

  @media screen and (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const SpeakingLink = styled.a`
  background-color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-size: 20px;
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  transition: all var(--animation-global);

  @media screen and (min-width: 768px) {
    width: 70px;
    height: 70px;
  }

  &:focus,
  &:hover,
  &:active {
    background-color: var(--accent-color);
    box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);
  }

  &.animated {
    animation: ${pulse} 1000ms infinite ease-in-out alternate;
  }

  &:before {
    content: '';
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &.animated:before {
    content: '';
    z-index: -1;
    position: absolute;
    border-radius: 50%;
    display: block;
    width: 55px;
    height: 55px;
    /* animation: ${pulse} 1000ms infinite ease-in-out alternate; */

    filter: blur(10px);
    opacity: 1;
    background: linear-gradient(360deg, var(--main-color), #f9ea38);

    @media screen and (min-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }
`;

export const SpeakingLogo = styled(SpeakingIconOption)`
  fill: var(--main-color);
  width: 31px;
  height: 31px;
  z-index: 5;

  @media screen and (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const BoxHideSwitch = styled.div`
  position: absolute;
  top: 118px;
  left: 0;

  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.09));

  z-index: 10;

  width: 12px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  &:hover * {
    stroke: var(--accent-color);
  }

  @media screen and (min-width: 768px) {
    top: 155px;
  }
`;

export const BoxHideSwitchFree = styled(BoxHideSwitch)`
  top: 50%;
  transform: translateY(-50%);

  @media screen and (min-width: 768px) {
    top: 50%;
  }
`;

export const BoxHideLeftSwitch = styled(BoxSwitchLeft)`
  stroke: var(--main-color);
  transition: stroke var(--animation-global);
`;

export const BoxHideRightSwitch = styled(BoxSwitchRight)`
  stroke: var(--main-color);
  transition: stroke var(--animation-global);
`;

export const SupportArrow = styled(SupportArrowIcon)`
  fill: var(--main-color);
  position: absolute;
  bottom: 60px;
  left: 60px;
  width: 80px;
  height: 80px;
  z-index: 5;
  opacity: 0;
  transition: all var(--animation-global);

  @media screen and (min-width: 768px) {
    width: 120px;
    height: 120px;
  }

  &.animated {
    opacity: 1;
    filter: drop-shadow(1px 1px 7px #f9ea38);
    animation: ${pulse} 1000ms infinite ease-in-out alternate;
  }
`;

export const SupportPointer = styled(SupportPointerIcon)`
  fill: var(--main-color);
  position: absolute;
  bottom: 60px;
  right: 100px;
  width: 64px;
  height: 64px;
  z-index: 5;
  opacity: 0;

  @media screen and (min-width: 768px) {
    width: 72px;
    height: 72px;
  }

  &.animated {
    opacity: 1;
    filter: drop-shadow(1px 1px 7px #f9ea38);
    transform: rotate(180deg);
    animation: ${pulse} 1s infinite ease-in-out alternate;
  }
`;

export const StreamPlaceHolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StreamPlaceHolderText = styled.p`
  text-align: center;
  font-size: 36px;
  max-width: 960px;
  line-height: 1.2;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #d31313;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const StreamRefreshText = styled(StreamPlaceHolderText)`
  font-size: 22px;
`;

export const StreamRefreshQuestion = styled.span`
  display: block;
  margin-bottom: 6px;
`;

export const StreamRefreshPageLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: var(--main-color);

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const LoginFormText = styled.p`
  font-size: 16px;
  text-align: center;

  @media screen and (min-width: 1280px) {
    font-size: 24px;
    max-width: 840px;
  }
`;

export const LoginFormTextWSPA = styled(LoginFormText)`
  @media screen and (min-width: 1280px) {
    max-width: 600px;
  }
`;

export const LoginLogo = styled(LogoClean)`
  width: 240px;

  @media screen and (min-width: 768px) {
    width: 360px;
  }

  @media screen and (min-width: 1280px) {
    width: 452px;
  }
`;

export const StreamAuthText = styled.p`
  text-align: center;
  font-family: var(--new-font-family);
  font-size: 18px;
  width: 92%;
  max-width: 420px;

  @media screen and (min-width: 768px) {
    font-size: 24px;
    max-width: 630px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 840px;
  }
`;

export const StreamAuthTextHello = styled.span`
  display: block;
`;

export const LoginInput = styled(Input)`
  border: 2px solid var(--main-color);
  border-radius: 50px;
  padding: 12px 20px;

  @media screen and (min-width: 768px) {
    /* padding: 25px 40px; */
  }

  &::placeholder {
    font-size: 20px;
    color: #000;
  }

  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      font-family: var(--new-font-family);
      -webkit-text-fill-color: var(--main-color);
      -webkit-box-shadow: 0 0 0px 50px var(--accent-semi-transparent-color) inset;
    }
  }
`;

export const LoginInputNote = styled(InputNote)`
  position: static;
  color: var(--main-color);
  font-size: 18px;
  bottom: -1.1em;

  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const LoginErrorNote = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  color: red;

  transition: opacity var(--animation-global);
`;
