import styled from 'styled-components';
import { ErrorMessage, Field, Form } from 'formik';
import { SectionDescription } from 'components/HowItWorks/HowItWorks.styled';

export const PageFormNewSection = styled.section`
  position: relative;
  padding: 50px 20px 50px 20px;

  @media screen and (min-width: 768px) {
    padding: 100px 40px 100px 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 60px;
    padding-top: 150px;
    padding-bottom: 150px;
  }
`;

export const StyledFormNew = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--new-font-family);
  width: 100%;
  margin: 0 auto;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

export const PageFormTitleBox = styled.div`
  width: 100%;
  max-width: 480px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    max-width: unset;
    margin-bottom: 60px;
  }

  @media screen and (min-width: 1280px) {
    margin: 0 auto;
    margin-bottom: 80px;
    min-width: 340px;
  }
`;

export const PageFormDescription = styled(SectionDescription)`
  margin: 0 auto;
  max-width: unset;
`;

export const PageFormLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media screen and (min-width: 360px) {
    max-width: 450px;
  }

  @media screen and (min-width: 1280px) {
    width: 400px;
  }
`;

export const PageFormInput = styled(Field)`
  width: 100%;
  padding: 19px 20px;
  font-size: 14px;
  color: var(--main-color);
  border: 2px solid var(--main-color);
  border-radius: 50px;

  @media screen and (min-width: 360px) {
    max-width: 450px;
  }

  @media screen and (min-width: 1280px) {
    width: 400px;
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
      -webkit-text-fill-color: var(--main-color);
      -webkit-box-shadow: 0 0 0px 1000px var(--accent-color) inset;
    }
  }

  &::placeholder {
    color: var(--main-color);
  }
`;

export const InputNote = styled(ErrorMessage)`
  position: absolute;
  bottom: -20px;
  color: var(--secondary-burnt-color);
  text-align: center;
  font-size: 15px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    bottom: -28px;
    font-size: 22px;
  }
`;

export const PageFormInputSchool = styled(PageFormInput)`
  border: 2px solid var(--school-color);

  &::placeholder {
    color: var(--school-color);
  }
`;

export const PageFormInputUniversity = styled(PageFormInput)`
  border: 2px solid var(--university-color);

  &::placeholder {
    color: var(--university-color);
  }
`;

export const PageFormLeadBtn = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 16px;
  width: 100%;
  height: 58px;
  padding: 19px 20px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  color: #fff;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;

  @media screen and (min-width: 360px) {
    max-width: 450px;
  }

  @media screen and (min-width: 1280px) {
    margin: 0;
    margin-left: 8px;
    width: 230px;
  }

  text-align: center;
  position: relative;
  outline: transparent;
  transition: box-shadow var(--animation-global),
    transform var(--animation-global);
`;

export const PageFormLeadBtnSchool = styled(PageFormLeadBtn)`
  background: linear-gradient(321.77deg, #4b0082 3.2%, #924dff 93.86%);
`;

export const PageFormLeadBtnUniversity = styled(PageFormLeadBtn)`
  background: linear-gradient(321.96deg, #002395 -5.61%, #352ce8 93.88%);
`;
