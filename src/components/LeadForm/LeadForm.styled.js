import { ErrorMessage, Field, Form } from 'formik';
import styled from 'styled-components';

import { ReactComponent as CircleCloseIcon } from '../../img/svg/close-circle.svg';
import { ReactComponent as FormBackgroundStar } from '../../img/svg/heroStar.svg';

export const StyledForm = styled(Form)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  overflow-x: hidden;

  width: 100%;
  max-width: 375px;
  padding: 80px 20px 50px 20px;
  margin: 0 auto;

  font-family: var(--new-font-family);
  border-radius: 24px;
  background-color: var(--secondary-color);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.18);

  @media screen and (min-width: 768px) {
    max-width: 530px;
    padding: 50px 39px;
  }
`;

export const FormTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    gap: 16px;
    margin-bottom: 32px;
  }
`;

export const FormTitle = styled.h3`
  font-family: var(--new-font-family);
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
`;

export const FormSubTitle = styled.p`
  font-family: var(--new-font-family);
  font-size: 16px;
  font-weight: 400;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const FormInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
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
    padding: 20px 40px;
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

  &::placeholder {
  }
`;

export const InputSelect = styled(Field)`
  width: 100%;
  height: 58px;
  padding: 22px 20px;
  font-size: 14px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  line-height: 1;

  @media screen and (min-width: 768px) {
    height: 59px;
    padding: 20px 40px;
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

  &::placeholder {
  }
`;

export const InputNote = styled(ErrorMessage)`
  color: red;
  text-align: center;
  font-size: 12px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    bottom: -28px;
    font-size: 16px;
  }
`;

export const HiddenInput = styled(Field)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  color: transparent;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

export const FormCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background-color: transparent;
  border: 2px solid var(--secondary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color var(--animation-global);

  &:hover {
    border-color: var(--accent-color);
  }
`;

export const CloseIcon = styled(CircleCloseIcon)`
  fill: var(--secondary-color);
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const TopFormBackgroundStar = styled(FormBackgroundStar)`
  position: absolute;
  top: 99px;
  left: -58px;

  opacity: 0.1;
  width: 116px;
  height: 116px;

  @media screen and (min-width: 768px) {
    width: 190px;
    height: 190px;
    top: -6px;
    left: -101px;
  }
`;

export const BottomFormBackgroundStar = styled(FormBackgroundStar)`
  position: absolute;
  bottom: 10px;
  right: -21px;

  opacity: 0.1;
  width: 40px;
  height: 40px;
`;

export const LeftFormBackgroundStar = styled(FormBackgroundStar)`
  position: absolute;
  left: 24px;
  bottom: -112px;

  opacity: 0.1;
  width: 89px;
  height: 89px;

  @media screen and (min-width: 1280px) {
    width: 310px;
    height: 310px;
    top: 345px;
    left: -360px;
  }
`;

export const RightFormBackgroundStar = styled(FormBackgroundStar)`
  position: absolute;
  right: 8px;
  top: -193px;

  opacity: 0.1;
  width: 42px;
  height: 42px;

  @media screen and (min-width: 1280px) {
    width: 98px;
    height: 98px;
    right: -149px;
    top: -62px;
  }
`;

export const FormBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 100%;

  padding: 20px;
  font-size: 16px;
  font-weight: 700;

  text-transform: uppercase;
  color: var(--secondary-color);
  border-radius: 50px;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  border: none;
  flex-shrink: 0;
  cursor: pointer;

  outline: transparent;

  @media screen and (min-width: 768px) {
    font-size: 20px;
    letter-spacing: 0.6px;
    height: 70px;
  }

  &:hover,
  &:focus {
  }
`;
