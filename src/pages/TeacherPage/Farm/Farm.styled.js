import { KahootBtn } from 'components/Stream/Stream.styled';
import styled from 'styled-components';

export const FarmBox = styled.div`
  height: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 0;
  left: 0;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(-100%);
  }

  &.shown {
    transform: translateX(0);
  }

  & > iframe {
    position: absolute;
    z-index: 4;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const FullScreenBtn = styled(KahootBtn)`
  position: absolute;
  z-index: 10;
  top: 16px;
  right: 60px;
  width: 32px;
  height: 32px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 768px) {
    top: 60px;
    right: 16px;
  }
`;
