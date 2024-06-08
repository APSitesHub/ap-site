import styled, { keyframes } from 'styled-components';
import { ReactComponent as TitleSketchSVG } from '../../img/svg/sketchTitle.svg';
import { ReactComponent as TitleSketchDeuSVG } from '../../img/svg/sketchTitleDeu.svg';
import { ReactComponent as TitleSketchPolSVG } from '../../img/svg/sketchTitlePol.svg';
import { ReactComponent as UnderlineShort } from '../../img/svg/hero-underline-short.svg';
import { ReactComponent as UnderlineLong } from '../../img/svg/hero-underline-long.svg';

import heroStarIcon from 'img/svg/heroStar.svg';
import heroSchoolStarIcon from 'img/svg/heroSchoolStar.svg';
import heroUniversityStarIcon from 'img/svg/heroUniversityStar.svg';

export const HeroSection = styled.section`
  position: relative;
  min-height: 500px;
  padding-top: 60px;
  padding-bottom: 30px;
  margin-top: 60px;

  @media screen and (min-width: 768px) {
    padding-bottom: 40px;
    padding-top: 105px;
    margin: 0;
  }

  @media screen and (min-width: 1280px) {
    padding: 55px 0;
    padding-top: 145px;
  }
`;

export const HeroSectionNew = styled.section`
  position: relative;
  min-height: 500px;
  padding-top: 94px;
  padding-bottom: 0px;

  @media screen and (min-width: 768px) {
    margin: 0;
    padding-top: 160px;
  }

  @media screen and (min-width: 1280px) {
    padding-top: 247px;
    padding-bottom: 0;
  }
`;

export const HeroTextWrapper = styled.div``;

export const Title = styled.h1`
  position: relative;
  z-index: 1;

  width: 280px;
  color: var(--main-color);
  font-family: var(--title-font-family);
  font-size: 35px;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  -webkit-text-stroke: 1px var(--main-color);
  margin: 0 auto 15px auto;

  @media screen and (min-width: 360px) {
    width: 300px;
    font-size: 38px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
    letter-spacing: 3.5px;
    width: 700px;
    font-size: 70px;
    -webkit-text-stroke: 2px var(--main-color);
  }

  @media screen and (min-width: 960px) {
    width: 900px;
  }
`;

export const TitleNew = styled.h1`
  position: relative;
  z-index: 1;

  width: 93%;
  font-family: var(--new-font-family);
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 1.1;
  margin: 0 auto 32px auto;

  @media screen and (min-width: 360px) {
    max-width: 560px;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto 32px auto;
    font-size: 35px;
    line-height: 1.2;
    max-width: 640px;
  }

  @media screen and (min-width: 1280px) {
    margin: 0 auto 40px auto;
    font-size: 50px;
    max-width: 960px;
  }

  &:before {
    content: url(${heroStarIcon});

    position: absolute;
    top: -29px;
    right: 15px;
    width: 27px;
    height: 27px;

    @media screen and (min-width: 768px) {
      top: -88px;
      right: -48px;
      width: 77px;
      height: 77px;
    }
  }
`;

export const TitleSchool = styled(TitleNew)`
  margin: 0 auto 16px auto;

  &:before {
    content: url(${heroSchoolStarIcon});
  }
`;

export const TitleUniversity = styled(TitleNew)`
  margin: 0 auto 16px auto;

  &:before {
    content: url(${heroUniversityStarIcon});
  }
`;

export const TitleDescription = styled.p`
  padding: 0 20px;
  font-family: var(--new-font-family);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin: 0 auto 32px auto;
  max-width: 480px;

  @media screen and (min-width: 768px) {
    max-width: 540px;
  }

  @media screen and (min-width: 1280px) {
    margin: 0 auto 40px auto;
    max-width: 768px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
    margin-bottom: 170px;
  }
`;

export const LeadBtnNew = styled.button`
  display: flex;
  padding: 20px 60px;
  justify-content: center;
  width: 93%;
  max-width: 346px;

  border-radius: 50px;
  border: none;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  font-family: var(--new-font-family);
  color: var(--secondary-color);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.48px;

  @media screen and (min-width: 768px) {
    max-width: 265px;
  }
`;

export const AddBtnNew = styled.button`
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

export const LeadBtnSchool = styled(LeadBtnNew)`
  background: linear-gradient(321.77deg, #4b0082 3.2%, #924dff 93.86%);
`;

export const AddBtnSchool = styled(AddBtnNew)`
  border: 2px solid #924dff;
`;

export const LeadBtnUniversity = styled(LeadBtnNew)`
  background: linear-gradient(321.96deg, #002395 -5.61%, #352ce8 93.88%);
`;

export const AddBtnUniversity = styled(AddBtnNew)`
  border: 2px solid #352ce8;
`;

export const LesserTitle = styled.p`
  position: relative;
  z-index: 1;

  color: var(--main-color);
  font-family: var(--title-font-family);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  -webkit-text-stroke: 1px var(--main-color);
  margin: 0 auto 15px auto;

  @media screen and (min-width: 360px) {
    font-size: 22px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

const sketchAnimation = keyframes`
  0%{
    stroke-dashoffset: 746;
  }
  100% {
    /* closing the offset makes the line appear to be drawn-in */
    stroke-dashoffset: 0;
  }
`;

const sketchDeuAnimation = keyframes`
  0%{
    stroke-dashoffset: 1094;
  }
  100% {
    /* closing the offset makes the line appear to be drawn-in */
    stroke-dashoffset: 0;
  }
`;

const sketchPolAnimation = keyframes`
  0%{
    stroke-dashoffset: 1235;
  }
  100% {
    /* closing the offset makes the line appear to be drawn-in */
    stroke-dashoffset: 0;
  }
`;

export const TitleBlock = styled.span`
  @media screen and (min-width: 960px) {
    display: block;
  }
`;

export const TitleSketch = styled(TitleSketchSVG)`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke-dasharray: 746;
  width: 120px;

  @media screen and (min-width: 768px) {
    width: 270px;
  }

  & path {
    animation-name: ${sketchAnimation};
    animation-duration: 1.1s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    stroke: #f5ce46;
    stroke-width: 4px;
  }
`;

export const TitleSketchDeu = styled(TitleSketchDeuSVG)`
  position: absolute;
  z-index: -1;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke-dasharray: 1095;
  width: 180px;

  @media screen and (min-width: 768px) {
    width: 420px;
  }

  & path {
    animation-name: ${sketchDeuAnimation};
    animation-duration: 1.4s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    stroke: #f5ce46;
    stroke-width: 4px;
  }
`;

export const TitleSketchPol = styled(TitleSketchPolSVG)`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke-dasharray: 1235;
  width: 250px;

  @media screen and (min-width: 768px) {
    width: 540px;
  }

  & path {
    animation-name: ${sketchPolAnimation};
    animation-duration: 1.6s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    stroke: #f5ce46;
    stroke-width: 4px;
  }
`;

export const SubTitle = styled.span`
  position: relative;
  font-family: var(--secondary-font-family);
  font-size: 42px;
  -webkit-text-stroke: 0;
  letter-spacing: 2px;
  line-height: 0.7;
  color: transparent;

  @media screen and (min-width: 768px) {
    font-size: 100px;
    vertical-align: sub;
  }
`;

export const Description = styled.p`
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
  padding: 0 30px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    padding: 0 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 55px;
    max-width: 900px;
  }
`;

export const DescriptionMoreText = styled.span`
  transition: opacity var(--animation-global), font-size var(--animation-global),
    margin var(--animation-global), padding var(--animation-global);

  &.more-shown {
  }

  &.more-hidden {
    font-size: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    transition: opacity var(--animation-global),
      font-size var(--animation-global), margin var(--animation-global),
      padding var(--animation-global);
  }
`;

export const DescriptionSiteText = styled.span`
  display: block;
  margin-top: 1em;
`;

export const DescriptionTrigger = styled.span`
  display: block;
  position: relative;
  max-width: max-content;
  margin: 0 auto;
  margin-bottom: 30px;

  font-family: var(--secondary-font-family);
  font-size: 18px;
  font-weight: 700;

  color: var(--accent-color);
  text-align: center;
  text-transform: uppercase;
  transition: all var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 22px;
    margin-bottom: 40px;
  }

  @media screen and (min-width: 1280px) {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    color: var(--main-color);
  }
`;

const underlineStyles =
  'position: absolute; width: 100%; bottom: -6px; left: 0px; transform: rotate(-1.5deg);';

export const DescriptionUnderlineShort = styled(UnderlineShort)`
  ${underlineStyles}
`;

export const DescriptionUnderlineLong = styled(UnderlineLong)`
  ${underlineStyles}
`;
