import { Field, Form } from 'formik';
import styled from 'styled-components';
import { ReactComponent as ThankYouArrowIcon } from '../../img/svg/ty-arrow.svg';
import { ReactComponent as HeroStarIcon } from '../../img/svg/heroStar.svg';
import { FormBtn, Label } from 'components/LeadForm/LeadForm.styled';
import { ThankYouSection } from 'pages/ThankYouPage/ThankYouPage.styled';

export const FormSection = styled(ThankYouSection)`
  padding: 64px 20px 52px 20px;
  overflow: auto;

  @media screen and (min-width: 1280px) {
    min-height: 100vh;
  }
`;

export const PageForm = styled(Form)`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 21px;

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
  font-size: 28px;
  text-align: center;

  margin-bottom: 14px;

  @media screen and (min-width: 1280px) {
    font-size: 35px;
  }
`;

export const PageFormWrapper = styled.div`
  position: relative;
  max-width: 375px;
  margin: 0 auto;
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

export const FormLabel = styled(Label)`
  align-items: flex-start;
`;

export const Input = styled(Field)`
  width: 100%;
  height: 58px;
  padding: 22px 20px;
  font-size: 14px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  line-height: 1;

  @media screen and (min-width: 768px) {
    height: 59px;
    padding: 20px 20px;
    font-size: 19px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }

  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      -webkit-box-shadow: 0 0 0px 1000px var(--accent-semi-transparent-color)
        inset;
    }
  }
`;

export const InputName = styled.p`
  font-size: 12px;
  opacity: 0.6;
`;

export const LinkTreeFormBtn = styled(FormBtn)`
  margin-top: 19px;
`;
