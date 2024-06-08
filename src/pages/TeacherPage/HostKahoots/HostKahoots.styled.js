import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import styled from 'styled-components';
import { KahootBtn } from '../../../components/Stream/Stream.styled';
import { ReactComponent as MinimizeIcon } from '../../../img/svg/minimize.svg';
import { ReactComponent as MaximizeIcon } from '../../../img/svg/maximize.svg';
import { ReactComponent as ClipBoardAddIcon } from '../../../img/svg/clipBoardAdd.svg';
import { ReactComponent as ClipBoardCopyIcon } from '../../../img/svg/clipBoardCopy.svg';
import { ReactComponent as NameReverseIcon } from '../../../img/svg/nameReverse.svg';
import { ReactComponent as KahootPickerIcon } from '../../../img/svg/kahootPickerIcon.svg';
import { ReactComponent as KahootArrow } from '../../../img/svg/kahoot-arrow.svg';
import { CloseIcon, FormCloseBtn } from 'components/LeadForm/LeadForm.styled';
import { ChatLoginValidation } from 'utils/Chat/Chat.styled';

export const KahootBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  outline: transparent;

  transition: all var(--animation-global);

  &.hidden {
    transform: translateX(-100%);
  }

  &.shown {
    transform: translateX(0);
    left: 0;
  }

  &.minimized {
    width: 124px;
    height: 70px;
    top: unset;
    bottom: 25px;
    left: 10px;

    border-radius: 20px;
    box-shadow: -1px -1px 3px 0px rgba(0, 0, 0, 0.25);
  }

  &.hidden.minimized {
    transform: translateX(-50vw);
    z-index: -1;
  }

  & iframe {
    border: none;
    display: block;
    transition: width var(--animation-global);
  }

  &.minimized iframe {
    border-radius: 20px;
    overflow: hidden;
    scrollbar-width: none;
  }
`;

export const KahootPlaceholder = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;

  display: none;

  outline: transparent;

  .minimized & {
    display: block;
    pointer-events: none;
    z-index: 6;
    width: 100%;
    height: 70px;
  }
`;

export const ClickDisablerRight = styled.div`
  background-color: #19645b;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 1;
  width: 20px;
  height: 100%;
`;

export const ClickDisabler = styled.div`
  background-color: #19645b;
  position: absolute;
  bottom: 0;
  opacity: 1;
  width: 100%;
  height: 20px;
`;

export const KahootBackground = styled(StreamsBackgroundWrapper)`
  background: unset;

  transition: transform var(--animation-global);

  &.active {
    position: absolute;
    top: 0;
    left: 0;
    z-index: inherit;
  }

  .minimized & {
    background: unset;
  }
`;

export const KahootDisclaimerBackground = styled(KahootBackground)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: width var(--animation-global);
`;

export const KahootDisclaimerBox = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 48px 48px 20px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const KahootDisclaimerHeader = styled.h3`
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 700;
  font-family: var(--streams-secondary-font-family);
`;

export const KahootDisclaimerText = styled.p`
  font-family: var(--streams-font-family);
  font-size: 14px;
  font-weight: 500;
`;

export const KahootDisclaimerList = styled.ul`
  list-style: disc;
  padding: 12px 0px;
`;

export const KahootDisclaimerItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const KahootNumbersHider = styled(KahootBtn)`
  position: absolute;
  top: 64px;
  right: 16px;
  width: 32px;
  height: 32px;
  background-color: white;
  cursor: pointer;
  flex-shrink: 0;
  margin: 0;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);

  font-weight: 700;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    top: 150px;
    right: 16px;
  }

  &.animated:before {
    width: 100%;
    height: 100%;

    filter: blur(1px);
    opacity: 0.5;
    background: linear-gradient(180deg, var(--main-color), #f9ea38);
  }
`;

export const KahootPicker = styled.div`
  position: absolute;
  top: 112px;
  right: 16px;
  width: max-content;
  z-index: 10;
  font-family: var(--title-font-family);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  transition: all var(--animation-global);

  @media screen and (min-width: 768px) {
    flex-direction: column;
    top: calc(70vh - 70px);
    right: 16px;

    transform: translateY(-50%);
  }

  &.hidden {
    transform: translateX(150px);

    @media screen and (min-width: 768px) {
      transform: translate(-50%, -200%);
    }
  }

  .minimized & {
    display: none;
  }

  &.shown {
    transform: translateX(0px);

    @media screen and (min-width: 768px) {
      transform: translate(-50%, 0px);
    }
  }
`;

export const KahootNumbersBtn = styled(KahootBtn)`
  position: static;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  background-color: white;
  font-family: var(--my-ap-font-family);
  color: #000;
  cursor: pointer;

  flex-shrink: 0;

  margin: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  font-size: 32px;
  font-weight: 700;

  &.active {
    background-color: var(--accent-color);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    width: 56px;
    height: 56px;
  }

  &:focus,
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const KahootMinimizerBtn = styled(KahootBtn)`
  position: absolute;
  top: calc(100vh - 95px);
  left: 140px;
  z-index: 9;
  width: 70px;
  height: 70px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);

  transition: all var(--animation-global);

  .minimized & {
    top: 0%;
    left: unset;
    right: -80px;
  }

  &.hidden {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
`;

export const KahootMinimizeIcon = styled(MinimizeIcon)`
  width: 44px;
  height: 44px;
  stroke: var(--main-color);
`;

export const KahootMaximizeIcon = styled(MaximizeIcon)`
  width: 44px;
  height: 44px;
  stroke: var(--main-color);
`;

export const ClipBoardBtn = styled(KahootBtn)`
  position: absolute;
  top: 16px;
  right: 106px;
  width: 32px;
  height: 32px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 768px) {
    top: 106px;
    right: 16px;
  }
`;

export const ClipBoardInputForm = styled.form`
  font-family: var(--streams-font-family);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ClipBoardNotification = styled.div`
  font-family: var(--streams-font-family);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ClipBoardFormText = styled.p`
  color: var(--main-color);
  font-size: 14px;
  font-weight: 700;
`;

export const ClipBoardFormDismissBtn = styled(FormCloseBtn)`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 24px;
  height: 24px;

  border-color: var(--main-color);
  border-radius: 50%;
  background-color: transparent;
`;

export const NameReverseBtn = styled(ClipBoardBtn)`
  top: 64px;
  right: 106px;

  @media screen and (min-width: 768px) {
    top: 106px;
    right: 64px;
  }
`;

export const DismissIcon = styled(CloseIcon)`
  width: 20px;
  height: 20px;
  fill: var(--main-color);
`;

export const ClipBoardInput = styled.input`
  width: 100%;
  font-size: 19px;
  font-weight: 700;
`;

export const ClipBoardSubmitBtn = styled.button`
  display: block;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  width: max-content;
  max-width: 70%;
`;

export const ClipBoardAdd = styled(ClipBoardAddIcon)`
  width: 22px;
  height: 22px;
  fill: var(--main-color);
  stroke: var(--main-color);
`;

export const ClipBoardCopy = styled(ClipBoardCopyIcon)`
  width: 22px;
  height: 22px;
  fill: var(--main-color);
  stroke: var(--main-color);
`;

export const KahootPickerBtn = styled(KahootPickerIcon)`
  width: 22px;
  height: 22px;
  fill: var(--main-color);
  stroke: var(--main-color);
`;

export const NameReverse = styled(NameReverseIcon)`
  width: 22px;
  height: 22px;
  stroke: var(--main-color);
`;

export const KahootNameValidation = styled(ChatLoginValidation)`
  font-family: var(--streams-font-family);

  width: 100%;
`;

export const ArrowFakeButton = styled(KahootArrow)`
  width: 42px;
  height: 32px;
  fill: var(--main-color);
`;

export const KahootEnlargeButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--accent-color);
  background-color: var(--main-color);
  border: none;
  border-radius: 20px;
  outline: transparent;

  font-size: 24px;
  font-weight: 700;
`;
