import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import styled from 'styled-components';
import { ReactComponent as YTPSettingsIcon } from '../../../img/svg/supportIcons/ytp-settings.svg';
import { ReactComponent as YTPSoundMutedIcon } from '../../../img/svg/supportIcons/ytp-sound-muted.svg';
import { ReactComponent as YTPSoundIcon } from '../../../img/svg/supportIcons/ytp-sound.svg';
import { ReactComponent as SupportKahootIcon } from '../../../img/svg/kahootIcon.svg';
import { ReactComponent as ClipBoardAddIcon } from '../../../img/svg/clipBoardAdd.svg';
import { ReactComponent as ClipBoardCopyIcon } from '../../../img/svg/clipBoardCopy.svg';
import { ReactComponent as NameReverseIcon } from '../../../img/svg/nameReverse.svg';
import { ReactComponent as KahootPickerIcon } from '../../../img/svg/kahootPickerIcon.svg';
import { ReactComponent as FullScreenIcon } from '../../../img/svg/fullScreen.svg';
import { ReactComponent as FullScreenExitIcon } from '../../../img/svg/fullScreenExit.svg';

export const SupportBox = styled.div`
  height: 95vh;
  overflow-y: scroll;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 0;
  left: 0;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(-100%);
  }

  &.shown {
    transform: translateX(0);
  }
`;

export const SupportBackground = styled(StreamsBackgroundWrapper)`
  height: 100%;
  background-position: right -70px bottom 0px;
  background-size: auto 33%;

  @media screen and (min-width: 768px) {
    background-position: center bottom 25px;
    background-size: auto 40%;
  }

  @media screen and (min-width: 1280px) {
    background-position: right -115px bottom -115px;
    background-size: auto 55%;
  }
`;

export const SupportFAQBox = styled.div`
  padding: 20px 40px 20px 65px;

  @media screen and (min-width: 768px) {
    padding: 28px 32px 28px 95px;
  }

  @media screen and (min-width: 1280px) {
    padding: 36px 40px 36px 95px;
  }
`;

export const FAQHeading = styled.h3`
  color: var(--main-color);
  font-size: 32px;
  font-weight: 700;
  font-family: var(--title-font-family);
  text-align: center;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 40px;
  }
`;

export const FAQList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FAQListItem = styled.li``;

export const FAQListQuestion = styled.span`
  display: inline-block;
  color: var(--main-color);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;

  transition: color var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 24px;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const FAQListAnswer = styled.p`
  font-size: 15px;

  @media screen and (min-width: 768px) {
    font-size: 19px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 21px;
  }
`;

export const FAQHighlight = styled.span`
  font-weight: 600;
`;

export const YTPSettings = styled(YTPSettingsIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const YTPSoundMuted = styled(YTPSoundMutedIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const YTPSound = styled(YTPSoundIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportKahoot = styled(SupportKahootIcon)`
  fill: #000;

  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportClipBoardAdd = styled(ClipBoardAddIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportClipBoardCopy = styled(ClipBoardCopyIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportFullScreenIcon = styled(FullScreenIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportNameReverse = styled(NameReverseIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportFullScreenExitIcon = styled(FullScreenExitIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SupportKahootPickerIcon = styled(KahootPickerIcon)`
  vertical-align: middle;
  display: inline-block;
  width: 1em;
  height: 1em;
`;
