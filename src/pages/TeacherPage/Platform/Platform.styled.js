import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import styled from 'styled-components';

export const PlatformBox = styled.div`
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
    top: 100%;
  }

  & > iframe.active {
    position: absolute;
    z-index: 5;
    top: 0;
  }
`;

export const AddLessonBtn = styled.button`
  position: absolute;
  z-index: 6;
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--main-color);
  border: none;
  border-radius: 50%;
  outline: transparent;

  color: var(--accent-color);
  font-size: 26px;
  font-weight: 700;
`;

export const PlatformWhiteboardBtn = styled.button`
  position: absolute;
  z-index: 8;
  bottom: 3ch;
  left: 30px;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--main-color);
  border: none;
  border-radius: 50%;
  outline: transparent;

  color: var(--accent-color);
  font-size: 26px;
  font-weight: 700;
`;

export const PlatformBackground = styled(StreamsBackgroundWrapper)`
  background: unset;

  transition: transform var(--animation-global);

  &.active {
    position: absolute;
    top: 0;
    left: 0;
    z-index: inherit;
    width: 100%;
  }

  .minimized & {
    background: unset;
  }
`;
