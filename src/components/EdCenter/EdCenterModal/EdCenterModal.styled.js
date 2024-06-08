import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RouteModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);

  border-radius: 20px;
  background-color: var(--main-color);
  text-align: center;

  width: 300px;
  padding: 20px;
  padding-top: 40px;

  @media screen and (min-width: 768px) {
    width: 500px;
    padding: 30px;
  }

  @media screen and (min-width: 1280px) {
    width: 700px;
    padding: 40px;
  }
`;

export const RouteModalText = styled.h3`
  font-size: 30px;
  text-align: center;
  color: var(--accent-color);
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 42px;
  }
`;

export const PageLinkBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PageLink = styled(Link)`
  padding: 8px;

  color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 20px;
  background-color: var(--secondary-color);
  transition: color var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 36px;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;
