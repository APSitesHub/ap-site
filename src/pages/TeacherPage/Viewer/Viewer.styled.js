import { KahootBtn } from 'components/Stream/Stream.styled';
import styled from 'styled-components';

export const ViewerBox = styled.div`
  height: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 0;
  right: 0;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(100%);
  }

  &.shown {
    transform: translateX(0);
  }
`;

export const ViewerBoxVertical = styled.div`
  height: 40%;
  width: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  position: absolute;
  border-radius: 20px;
  bottom: 0;
  left: 0;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global), height var(--animation-global);

  &.hidden {
    transform: translateY(100%);
  }

  &.shown {
    transform: translateY(0);
  }
`;

export const ViewerFullScreenBtn = styled(KahootBtn)`
  position: absolute;
  top: 48px;
  right: 36px;
  width: 48px;
  height: 48px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);
  transition: none;

  &.fullscreen-on {
    top: calc(60% + 48px);
  }
`;
