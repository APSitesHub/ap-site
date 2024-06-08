import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StreamNavigationBox = styled.section`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  gap: 15px;

  @media screen and (min-width: 768px) {
    padding: 30px;
    gap: 20px;
  }

  @media screen and (min-width: 1280px) {
    padding: 40px;
    gap: 25px;
  }
`;

export const StreamNavigation = styled.div`
  display: flex;
  flex-direction: column;
  
  font-family: var(--streams-font-family);
  gap: 15px;

  @media screen and (min-width: 768px) {
    gap: 20px;
  }

  @media screen and (min-width: 1280px) {
    gap: 25px;
  }
`;

export const StreamNavTitle = styled.h2`
  text-align: center;
  color: var(--main-color);
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 1.8px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 40px;
  }
`;

export const StreamNavDescription = styled.p`
  text-align: center;
  color: var(--main-color);

  font-size: 22px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 26px;
  }
`;

export const StreamNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

export const StreamNavItem = styled.li`
  min-width: 56px;
  width: max-content;

  @media screen and (min-width: 768px) {
    min-width: 69px;
  }
  @media screen and (min-width: 1280px) {
    min-width: 80px;
  }
`;

export const StreamNavLink = styled(Link)`
  display: block;

  cursor: pointer;
  text-decoration: none;
  text-align: center;
  padding: 8px;

  font-size: 32px;
  font-weight: 600;
  letter-spacing: 1.8px;

  color: var(--accent-color);
  border: 2px solid var(--main-transparent-color);
  border-radius: 50%;

  transition: color var(--animation-global),
    background-color var(--animation-global);

  @media screen and (min-width: 768px) {
    padding: 12px;
    font-size: 36px;
  }

  @media screen and (min-width: 1280px) {
    padding: 16px;
    font-size: 40px;
  }

  &:hover,
  &:focus {
    color: var(--main-color);
    background-color: var(--accent-transparent-color);
  }
`;
