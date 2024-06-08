import styled from 'styled-components';
import { ReactComponent as UpArrowIcon } from '../../img/svg/upArrow.svg';
import { Link } from 'react-scroll';

export const StyledUpButton = styled(Link)`
  width: 37.5px;
  height: 37.5px;

  position: fixed;
  bottom: 65px;
  right: 40px;
  z-index: 4;

  background-color: var(--secondary-color);
  filter: drop-shadow(1px 1px 7px rgba(0, 0, 0, 0.16));
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover > svg {
    color: var(--accent-color);
    transform: scale(1.1) translateY(-3px);
  }
`;

export const UpArrow = styled(UpArrowIcon)`
  width: 25px;
  transition: color var(--animation-global), transform var(--animation-global);
`;
