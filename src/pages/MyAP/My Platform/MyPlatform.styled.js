import styled from 'styled-components';

export const MyPlatformBox = styled.div`
  height: 100vh;
  width: 100vw;

  overflow: hidden;

  position: absolute;
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
`;