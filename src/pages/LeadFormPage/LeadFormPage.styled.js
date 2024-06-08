import { Form } from 'formik';
import styled from 'styled-components';
import { ReactComponent as ThankYouArrowIcon } from '../../img/svg/ty-arrow.svg';
import { ReactComponent as HeroStarIcon } from '../../img/svg/heroStar.svg';

export const PageForm = styled(Form)`
  overflow-x: hidden;

  width: 100%;
  max-width: 375px;
  margin: 0 auto;

  font-family: var(--new-font-family);

  @media screen and (min-width: 768px) {
    max-width: 538px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 630px;
  }
`;

export const PageFormHeading = styled.h1`
  font-size: 30px;
  text-align: center;

  margin-bottom: 14px;

  @media screen and (min-width: 1280px) {
    font-size: 35px;
  }

  @media screen and (min-width: 1440px) {
    font-size: 40px;
  }
`;

export const PageFormWrapper = styled.div`
  position: relative;
  max-width: 375px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 60px;

    max-width: 400px;
  }

  @media screen and (min-width: 1280px) {
    left: 120px;

    max-width: 538px;
  }

  @media screen and (min-width: 1440px) {
    left: 260px;

    max-width: 631px;
  }
`;

export const PageFormPicture = styled.picture`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
    height: auto;
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const PageFormImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  margin-bottom: 60px;

  @media screen and (max-width: 359px) {
    margin-bottom: 120px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }

  @media screen and (min-width: 960px) {
    max-width: 540px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 640px;
  }
`;

export const PageFormArrow = styled(ThankYouArrowIcon)`
  position: absolute;
  right: -10px;
  bottom: 185px;

  width: 23px;
  height: 81px;
  transform: rotate(-10deg);

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const PageFormBottomStar = styled(HeroStarIcon)`
  position: absolute;
  bottom: 198px;
  right: -36px;

  width: 72px;
  height: 72px;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const FormBottomStar = styled(HeroStarIcon)`
  @media screen and (max-width: 1279px) {
    display: none;
  }

  position: absolute;
  left: -65px;
  bottom: -94px;

  width: 100px;
  height: 100px;
  opacity: 0.1;

  @media screen and (min-width: 1440px) {
    left: -109px;
    bottom: -132px;

    width: 157px;
    height: 157px;
  }
`;
