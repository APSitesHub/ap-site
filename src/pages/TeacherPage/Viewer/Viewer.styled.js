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
  height: calc(40% + 60px);
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

export const ViewerFullScreenBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  border-radius: 50%;
  border: none;
  margin: 0 auto;

  position: absolute;
  top: 48px;
  right: 36px;
  width: 48px;
  height: 48px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.5);
  transition: background-color var(--animation-global);

  &.fullscreen-on {
    top: calc(60% + 48px);
  }

  &:focus,
  &:hover,
  &:active {
    background-color: var(--accent-color);
    box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);
  }
`;
