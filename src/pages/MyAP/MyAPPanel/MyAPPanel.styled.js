import styled from 'styled-components';
import { ReactComponent as BoxSwitchLeft } from '../../../img/svg/btnbox-switch-left-gray.svg';
import { ReactComponent as BoxSwitchRight } from '../../../img/svg/btnbox-switch-right-gray.svg';
import { ReactComponent as CalendarIcon } from '../../../img/svg/myap/calendar.svg';
import { ReactComponent as TimetableIcon } from '../../../img/svg/myap/timetable.svg';
import { ReactComponent as CupIcon } from '../../../img/svg/myap/cup.svg';
import { ReactComponent as SearchIcon } from '../../../img/svg/myap/search.svg';
import { ReactComponent as ResetIcon } from '../../../img/svg/myap/reset.svg';
import { ReactComponent as PointerIcon } from '../../../img/svg/myap/pointer.svg';
import { ReactComponent as GuideIcon } from '../../../img/svg/myap/guide.svg';

export const PanelBackdrop = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  background-color: #00000080;
  z-index: 4;
  opacity: 1;

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    pointer-events: none;

    transition: opacity var(--animation-global);
  }
`;

export const APPanel = styled.div`
  width: 40px;

  padding: 6px 4px;

  position: absolute;
  top: 142px;
  right: 14px;
  z-index: 5;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  transition: transform var(--animation-global);

  @media screen and (min-width: 768px) {
    width: 60px;
    gap: 10px;
    padding: 10px;
    border-radius: 21px;

    right: 24px;
  }

  &.hidden {
    transform: translateX(200%);
  }
`;

export const APPanelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: none;

  color: #bebecc;
  transition: color var(--animation-global);

  /* &:hover svg {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.16));
  } */
`;

export const APPanelResetBtn = styled(APPanelBtn)`
  &:focus svg,
  &:active svg {
    color: #525266;
  }

  &::before {
    content: 'Якщо урок на платформі не відкривається, натисніть на цю кнопку';
    pointer-events: none;

    position: absolute;
    top: 50%;
    right: 75%;
    z-index: 7;

    width: max-content;
    max-width: calc(75vw);
    font-size: 10px;
    line-height: 1.2;

    padding: 4px 6px;
    border: 0.5px solid #bebecc;
    background: #fff;
    color: #000;

    transform: translateY(-50%) scale(0, 0);
    transform-origin: right;
    transition: transform var(--animation-global);
  }

  &.tooltip-open::before {
    transform: translateY(-50%) scale(1, 1);
    transition: transform var(--animation-global);
  }
`;

export const SearchBtnIcon = styled(SearchIcon)`
  height: 25px;
  width: 25px;
  user-select: none;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  &.active {
    color: #525266;
  }
`;

export const FaqSearchBtnIcon = styled(SearchIcon)`
  height: 16px;
  width: 16px;
  color: #bebecc;
  user-select: none;

  transition: color var(--animation-global);
`;

export const CupBtnIcon = styled(CupIcon)`
  height: 25px;
  width: 25px;
  user-select: none;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  &.active {
    color: #525266;
  }
`;

export const CalendarBtnIcon = styled(CalendarIcon)`
  height: 25px;
  width: 25px;
  user-select: none;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  &.active {
    color: #525266;
  }
`;

export const TimetableBtnIcon = styled(TimetableIcon)`
  height: 25px;
  width: 25px;
  user-select: none;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  &.active {
    color: #525266;
  }
`;

export const GuideBtnIcon = styled(GuideIcon)`
  height: 25px;
  width: 25px;
  user-select: none;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  &.active {
    color: #525266;
  }
`;

export const PanelHideSwitch = styled.div`
  position: absolute;
  top: 180px;
  right: 0;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  z-index: 10;

  width: 10px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;

  border-radius: 4px;

  &:hover * {
    stroke: var(--accent-color);
  }

  @media screen and (min-width: 768px) {
    top: 213px;
    transform: translateY(-50%);
    width: 12px;
    height: 42px;
  }
`;

export const PanelHideLeftSwitch = styled(BoxSwitchLeft)`
  stroke: #525266;
  transition: stroke var(--animation-global);
  width: 6px;
  height: 11px;

  @media screen and (min-width: 768px) {
    width: 8px;
    height: 13px;
  }
`;

export const PanelHideRightSwitch = styled(BoxSwitchRight)`
  stroke: #525266;
  transition: stroke var(--animation-global);
  width: 6px;
  height: 11px;

  @media screen and (min-width: 768px) {
    width: 8px;
    height: 13px;
  }
`;

export const IframeResetLinkButton = styled(APPanel)`
  top: -42px;
  left: 50%;

  transform: translateX(-50%);

  z-index: 5;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  height: auto;

  @media screen and (min-width: 768px) {
    top: -66px;
    padding: 15px;
  }
  &:hover,
  &:focus {
    background-color: none;
  }
`;

export const APPanelInstructionsPanel = styled(IframeResetLinkButton)`
  top: unset;
  bottom: -42px;

  @media screen and (min-width: 768px) {
    bottom: -66px;
  }
`;

export const IframeSetLinkIcon = styled(ResetIcon)`
  height: 25px;
  width: 25px;

  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }

  color: #bebecc;
  position: relative;
  pointer-events: none;

  transition: color var(--animation-global);
`;

export const IframeMarathonLinkPanel = styled(APPanel)`
  top: 0px;
  right: 0;

  width: 100%;
  height: 64px;

  z-index: 3;

  flex-direction: row;
  gap: 10px;

  padding: 12px;
  border-radius: 0;
  box-shadow: none;

  @media screen and (min-width: 768px) {
    background-color: var(--secondary-color);
    gap: 20px;
    right: 50%;
    transform: translateX(50%);
  }

  @media screen and (min-width: 1280px) {
    top: 4px;
    padding: 0;
    gap: 40px;
    height: 56px;
    width: 665px;
  }
`;

export const IframeMarathonText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (min-width: 768px) {
    gap: 10px;
  }
`;

export const APPanelMarathonBtn = styled.button`
  position: relative;
  overflow: hidden;

  flex-shrink: 0;

  height: 32px;
  width: 132px;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background: linear-gradient(322deg, #0f645b -5.61%, #09c6cc 93.88%);
  border: none;

  padding: 15px;

  @media screen and (min-width: 480px) {
    height: 40px;
    width: 162px;
  }

  @media screen and (min-width: 768px) {
    background-color: var(--secondary-color);

    height: 56px;
    width: 205px;
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

    background: linear-gradient(322deg, #09c6cc 23.22%, #0f645b 110.01%),
      #09c6cc;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const APPanelMarathonBtnText = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  color: var(--secondary-color);

  @media screen and (min-width: 375px) {
    font-size: 20px;
  }

  @media screen and (min-width: 480px) {
    font-size: 24px;
  }

  @media screen and (min-width: 768px) {
    top: calc(50% + 2px);
    font-size: 32px;
  }
`;

export const IframeMarathonPointerText = styled.p`
  color: #525266;
  font-size: 9px;
  font-family: var(--secondary-font-family);
  width: 114px;

  @media screen and (min-width: 375px) {
    font-size: 10px;
    width: 132px;
  }

  @media screen and (min-width: 480px) {
    font-size: 12px;
    width: 158px;
  }

  @media screen and (min-width: 768px) {
    font-size: 14px;
    width: auto;
  }
`;

export const IframeMarathonPointerLinkIcon = styled(PointerIcon)`
  color: #525266;
  width: 16px;
  height: 16px;

  @media screen and (min-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;
