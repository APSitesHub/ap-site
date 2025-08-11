import styled from 'styled-components';

export const PDFBox = styled.div`
  position: absolute;
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
    transform: scale(1.7);
    transform-origin: 0 0;
  }

  & > iframe.active {
    z-index: 5;
  }
`;