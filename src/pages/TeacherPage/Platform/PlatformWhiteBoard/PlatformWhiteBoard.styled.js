import styled from 'styled-components';

export const PlatformWhiteBoardBox = styled.div`
  height: 100%;
  width: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;

  font-family: var(--streams-font-family);

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(-100%);
  }

  &.shown {
    transform: translateX(0);
  }
`;