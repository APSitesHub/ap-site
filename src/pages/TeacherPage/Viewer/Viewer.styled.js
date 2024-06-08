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