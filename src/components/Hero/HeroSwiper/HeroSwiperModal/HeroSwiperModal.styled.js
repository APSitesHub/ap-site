import { DescriptionTrigger } from 'components/Hero/Hero.styled';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { FormCloseBtn } from 'components/LeadForm/LeadForm.styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LogoNewIcon } from '../../../../img/svg/logoNew.svg';
import { ReactComponent as LogoSchoolIcon } from '../../../../img/svg/logoSchool.svg';
import { ReactComponent as LogoUniversityIcon } from '../../../../img/svg/logoUniversity.svg';

export const ModalWindow = styled.div`
  font-family: var(--new-font-family);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);

  border-radius: 24px;
  background-color: var(--secondary-color);
  box-shadow: 0px 2px 3px 0px #0000002e;
  text-align: center;

  width: 300px;

  @media screen and (min-width: 360px) {
    width: calc(100vw - 40px);
    max-height: 95%;
  }

  @media screen and (min-width: 768px) {
    width: 50vw;
  }

  @media screen and (min-width: 1280px) {
    width: 50vw;
    max-width: 1280px;
  }
`;

export const MarqueeBackdrop = styled(Backdrop)`
  background-color: #000000ab;
`;

export const MarqueeCloseBtn = styled(FormCloseBtn)`
  width: 40px;
  height: 40px;

  position: static;

  margin: 0;
  border: none;
`;

export const ModalHeader = styled.div`
  width: 100%;

  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.18);
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  padding: 31px 21px 47px 21px;
`;

export const ModalDesc = styled.p`
  font-size: 16px;
  max-height: 145px;
  overflow-y: scroll;

  @media screen and (min-width: 1280px) {
    max-height: none;
    overflow-y: visible;
    font-size: 20px;
  }
  @media screen and (min-width: 1440px) {
    max-height: none;
    overflow-y: visible;
    font-size: 24px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Details = styled(DescriptionTrigger)`
  margin-bottom: 0;
`;

export const DetailsLink = styled(Link)`
  text-decoration: none;

  &:hover > span,
  &:focus > span {
    color: var(--secondary-color);
  }
`;

export const MarqueeForwardBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 5px;
  z-index: 2;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  transition: all var(--animation-global);

  background-color: #00000070;
  border-radius: 50%;
  border: none;

  &:hover svg,
  &:focus svg {
    fill: var(--accent-color);
  }

  &:hover,
  &:focus {
    scale: 1.1;
  }

  @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;

    right: -4em;
  }
`;

export const MarqueeForwardIcon = styled(IoIosArrowForward)`
  fill: var(--secondary-color);
  width: 30px;
  height: 30px;

  @media screen and (min-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

export const MarqueeBackBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 5px;
  z-index: 2;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  transition: all var(--animation-global);

  background-color: #00000070;
  border-radius: 50%;
  border: none;

  &:hover svg,
  &:focus svg {
    fill: var(--accent-color);
  }

  &:hover,
  &:focus {
    scale: 1.1;
  }

  @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;

    left: -4em;
  }
`;

export const MarqueeBackIcon = styled(IoIosArrowBack)`
  fill: var(--secondary-color);
  width: 30px;
  height: 30px;

  @media screen and (min-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

export const ModalText = styled.p`
  font-family: var(--new-font-family);
  font-size: 16px;
  font-weight: 500;

  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.18);

  @media screen and (min-width: 768px) {
    font-size: 21px;
  }
`;

export const LogoNewModal = styled(LogoNewIcon)`
  display: block;
  flex-shrink: 0;
  width: 121px;
  height: 24px;

  @media screen and (min-width: 768px) {
    width: 135px;
    height: 27px;
  }
`;

export const LogoSchoolModal = styled(LogoSchoolIcon)`
  display: block;
  flex-shrink: 0;
  width: 100px;
  height: 24px;

  @media screen and (min-width: 768px) {
    width: 112px;
    height: 27px;
  }
`;

export const LogoUniversityModal = styled(LogoUniversityIcon)`
  display: block;
  flex-shrink: 0;
  width: 121px;
  height: 24px;

  @media screen and (min-width: 768px) {
    width: 135px;
    height: 27px;
  }
`;

export const ModalVideoLimiter = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  margin-bottom: 13px;
  border-radius: 8px;
  overflow: hidden;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));

  @media screen and (min-width: 768px) {
    max-width: 960px;
    margin: 0;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export const PageLink = styled(Link)`
  display: flex;
  padding: 20px 60px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 93%;
  max-width: 346px;

  background: none;
  border-radius: 50px;
  border: 2px solid #0f645b;
  font-family: var(--new-font-family);
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.48px;

  @media screen and (min-width: 768px) {
    max-width: 265px;
  }
`;