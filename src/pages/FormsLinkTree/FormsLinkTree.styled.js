import { LinkTreeBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormLinkTreeBackgroundWrapper = styled(LinkTreeBackgroundWrapper)`

  font-family: var(--main-font-family);

  background-position: center top -4vh;

  background-size: auto 250px;
  background-repeat: no-repeat;

  @media screen and (min-width: 768px) {
    background-position: center top;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  line-height: 1.2;

  margin: 0 auto;
  margin-top: 128px;
  margin-bottom: 24px;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    margin-top: 160px;
}
`;

export const Subtitle = styled.h2`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;

  margin: 0 auto;
  margin-bottom: 36px;
  white-space: pre-line;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    max-width: 240px;
  }
`;

export const LinkBtn = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;

  width: 100%;
  max-width: 360px;

  padding: 24px 60px;
  border-radius: 50px;
  letter-spacing: 0.48px;

  @media screen and (min-width: 768px) {
    padding: 30px 60px;
    width: auto;
  }

  @media screen and (min-width: 1920px) {
    
    letter-spacing: 0.6px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity 350ms linear;

    background: linear-gradient(322deg, #09c6cc 23.22%, #0f645b 110.01%),
      #09c6cc;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }
`;

export const LinkBtnText = styled.span`
position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.48px;
  color: var(--secondary-color);
  width: 240px;
`

export const LinkBtnsContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 36px;
  max-width: 360px;

  display: flex;
  gap: 20px;
  flex-direction: column;
`;
