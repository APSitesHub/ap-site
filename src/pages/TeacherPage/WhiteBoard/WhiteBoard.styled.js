import styled from 'styled-components';

export const WhiteBoardBox = styled.div`
  height: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  background-color: transparent;
  position: absolute;
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

export const WhiteBoardBoxVertical = styled.div`
  height: 100%;

  scrollbar-width: thin;
  scrollbar-gutter: stable;

  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;

  font-family: var(--streams-font-family);

  transition: opacity var(--animation-global);

  &.hidden {
    opacity: 0;
    transform: translateX(100%);
  }

  &.shown {
    transform: translateX(0);
    opacity: 1;
  }
`;
