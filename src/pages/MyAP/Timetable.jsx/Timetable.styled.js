import styled from 'styled-components';
import { TimetableBtnIcon } from '../MyAPPanel/MyAPPanel.styled';

export const TimetableBox = styled.div`
  position: absolute;
  top: 30px;
  right: 60px;
  z-index: 5;

  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  font-family: var(--my-ap-font-family);

  overflow: hidden;
  border-radius: 20px;
  padding: 0 20px;
  padding-bottom: 10px;
  height: auto;
  overflow-y: scroll;
  width: calc(100% - 65px);

  @media screen and (min-width: 480px) {
    width: 362px;
  }

  @media screen and (min-width: 768px) {
    right: 90px;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    overflow-y: hidden;
  }
`;

export const TimetableHeading = styled.h3`
  padding: 9px 0;

  color: #525266;
  border-bottom: 1px solid #0000000d;
  margin-bottom: -1px;
  font-size: 20px;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TimetableIcon = styled(TimetableBtnIcon)``;

export const TimetableBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  font-size: 14px;
  line-height: 1.2;
  color: #525266;

  @media screen and (min-width: 390px) {
    flex-direction: row;
  }
`;

export const TimetableWebinars = styled.div`
  padding: 0 22.5px;
  position: relative;

  @media screen and (max-width: 389px) {
    padding-top: 5px;
    padding-bottom: 20px;
  }

  &::before {
    content: '';
    height: 132px;
    width: 1px;

    @media screen and (max-width: 389px) {
      width: 75%;
      height: 1px;
      top: unset;
      bottom: 10px;
      left: 50%;

      transform: translateX(-50%);
    }

    position: absolute;
    top: 21px;
    right: 0;
    z-index: 1;

    background-color: #0000000d;
  }
`;

export const TimetableSpeakings = styled.div`
  padding: 0 22.5px;

  @media screen and (max-width: 389px) {
    padding-bottom: 5px;
  }
`;

export const TimetableLessonType = styled.span`
  display: block;
  padding: 6px 0;

  @media screen and (max-width: 389px) {
    width: 87%;
  }

  text-align: center;
  width: 118px;

  border-bottom: 1px solid var(--accent-color);
  margin: 0 auto;
  margin-bottom: 10px;
`;

export const TimetableLessonLink = styled.a`
  display: block;
  padding: 5px 0;
  margin-top: 6px;
  height: 26px;

  position: relative;

  text-align: center;
  text-decoration: none;
  width: 100%;
  color: #000;
  font-weight: 400;
  border: 1.5px solid #525266;

  border-radius: 5px;
  overflow: hidden;
  background: transparent;

  transition: all var(--animation-global);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity var(--animation-global);

    background: linear-gradient(322deg, #09c6cc 23.22%, #0f645b 110.01%),
      #09c6cc;
  }

  &:hover,
  &:focus {
    border: 1.5px solid transparent;
    color: #fff;
    font-weight: 500;

    &::before {
      opacity: 1;
    }
  }
`;

export const TimetableLessonLinkText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;

  transform: translate(-50%, -50%);
`;

export const TimetableDays = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const TimetableDaysItem = styled.li`
  padding: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

export const TimetableDay = styled.span`
  display: block;
  font-size: 14px;
  text-align: center;
  color: #525266;
`;
