import { BackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import styled from 'styled-components';

export const AdmissionBackground = styled(BackgroundWrapper)`
  background-position: center top 70px;

  @media screen and (min-width: 768px) {
    background-position: left -140px top;
  }

  @media screen and (min-width: 1280px) {
    background-position: center top;
  }
`;

export const AdmissionSection = styled.section`
  position: relative;
  padding: 30px 0;

  @media screen and (min-width: 768px) {
    padding: 42px 0;
  }

  @media screen and (min-width: 1280px) {
    padding: 55px 0;
  }
`;

export const AdmissionWrapper = styled.div`
  padding: 0 30px;

  @media screen and (min-width: 768px) {
    padding: 0 42px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 55px;
  }
`;

export const AdmissionTitle = styled.h3`
  color: var(--main-color);
  font-family: var(--title-font-family);
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  -webkit-text-stroke: 1px var(--main-color);
  margin-bottom: 18px;

  @media screen and (min-width: 360px) {
    width: 300px;
    font-size: 40px;
  }

  @media screen and (min-width: 768px) {
    text-align: center;
    letter-spacing: 3.5px;
    margin: 0 auto;
    margin-bottom: 30px;
    width: 420px;
    font-size: 55px;
    -webkit-text-stroke: 2px var(--main-color);
  }

  @media screen and (min-width: 1280px) {
    width: 600px;
    font-size: 70px;
  }
`;

export const AdmissionSubTitle = styled.span`
  font-family: var(--secondary-font-family);
  font-size: 42px;
  -webkit-text-stroke: 0;
  letter-spacing: 2px;

  color: var(--accent-color);

  @media screen and (min-width: 768px) {
    font-size: 70px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 100px;
  }
`;

export const AdmissionDescription = styled.p`
  font-size: 20px;
  color: var(--main-color);
  margin-bottom: 15px;

  @media screen and (min-width: 768px) {
    text-align: center;
    font-size: 22px;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 1280px) {
    margin-bottom: 25px;
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
`;
