import styled, { css } from 'styled-components';

import { ReactComponent as _EndCallIcon } from '../../img/svg/end-call.svg';
import { ReactComponent as _CameraIcon } from '../../img/svg/camera.svg';
import { ReactComponent as _DisabledCameraIcon } from '../../img/svg/camera-slash.svg';
import { ReactComponent as _MicroIcon } from '../../img/svg/microphone.svg';
import { ReactComponent as _DisabledMicroIcon } from '../../img/svg/microphone-slash.svg';
import { ReactComponent as _ArrowUp } from '../../img/svg/faq-arrow-up.svg';
import { ReactComponent as _ArrowDown } from '../../img/svg/faq-arrow-down.svg';
import { ReactComponent as _BackIcon } from '../../img/svg/btnbox-switch-left-gray.svg';

// Room styles
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const VideochatContainer = styled.div`
  background-color: #0f645b;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 36px;
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;

  @media (max-width: 1024px) {
    padding: 16px;
    gap: 0;
  }
`;

export const MainVideoContainer = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;

  @media (max-width: 1024px) {
    margin: 0;
  }

  @media (max-width: 768px) {
    margin: auto;
  }
`;

export const MainVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 0 500px rgba(0, 0, 0, 1);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 16%;
  gap: 8px;

  @media (max-width: 1024px) {
    flex-basis: 0;
  }
`;

export const UsersVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;
  flex-grow: 1;
`;

export const UserVideo = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
  z-index: 1;
  min-width: 164px;

  ${({ $isUserVideo }) =>
    !$isUserVideo &&
    css`
      @media (max-width: 1024px) {
        display: none;
      }
    `}

  ${({ $isUserVideo }) =>
    $isUserVideo &&
    css`
      @media (max-width: 1024px) {
        position: absolute;
        left: 24px;
        top: 24px;
        border: 1px solid #09c6cc;
        width: 180px;
        height: auto;
      }
    `}
`;

export const ChatContainer = styled.div`
  display: none;
  /* background-color: beige;
  display: flex;
  flex-basis: 20%;
  flex-shrink: 0; */
`;

export const ButtonsContainer = styled.div`
  background-color: transparent;
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 8px;
`;

export const MediaButtonContainer = styled.div`
  display: flex;
  border-radius: 16px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid gray;
  justify-content: center;

  &:has(button:disabled) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${({ $isPagintionButton }) =>
    $isPagintionButton &&
    `
      @media (max-width: 1024px) {
        display: none;
      }
    `}

  ${({ $isRed }) =>
    $isRed &&
    `
      background-color: rgba(190, 20, 20, 0.6);

      &:hover {
        background-color: rgba(190, 20, 20, 0.8);
      }
    `}
`;

export const MediaButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  width: 100%;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

export const MediaSelector = styled.select`
  background-color: transparent;
  color: white;
  cursor: pointer;
  padding: 8px;
  padding-left: 16px;
  max-width: 20px;
  border: none;
  outline: none;
  border-left: 1px solid gray;
`;

export const MediaOption = styled.option`
  background-color: rgba(0, 0, 0, 0.7);
`;

export const EndCallIcon = styled(_EndCallIcon)`
  fill: #ffffff;
  height: 32px;
  width: 32px;
`;

export const MicroIcon = styled(_MicroIcon)`
  fill: #ffffff;
  height: 28px;
  width: 28px;
`;

export const DisabledMicroIcon = styled(_DisabledMicroIcon)`
  fill: #c62323;
  height: 28px;
  width: 28px;

  ${({ $isAbsolute }) =>
    $isAbsolute &&
    css`
      position: absolute;
      bottom: 16px;
      left: 24px;
    `}

  ${({ $isSmall }) =>
    $isSmall &&
    css`
      width: 18px;
      height: 18px;
      bottom: 6px;
      left: 6px;
    `}
`;

export const CameraIcon = styled(_CameraIcon)`
  fill: #ffffff;
  height: 28px;
  width: 28px;

  ${({ $isGray }) =>
    $isGray &&
    css`
      fill: #bebecc;
    `}
`;

export const DisabledCameraIcon = styled(_DisabledCameraIcon)`
  fill: #c62323;
  height: 28px;
  width: 28px;

  ${({ $isAbsolute }) =>
    $isAbsolute &&
    css`
      width: 64px;
      height: 64px;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -32px -32px;
    `}

  ${({ $isSmall }) =>
    $isSmall &&
    css`
      width: 18px;
      height: 18px;
      top: 50%;
      left: 50%;
      translate: -9px -9px;
    `}
`;

export const ArrowUp = styled(_ArrowUp)`
  height: 24px;
  width: 24px;
`;

export const ArrowDown = styled(_ArrowDown)`
  height: 24px;
  width: 24px;
`;

export const LargeText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  margin: auto;
  color: #ffffff;
  text-align: center;
`;

export const GradientBackground = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #0f645b, black, #0f645b);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Videochat styles
export const Page = styled.div`
  height: 100dvh;
  padding-top: 4rem;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const SubTitle = styled.h3`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const Label = styled.label`
  flex-basis: 30%;
  font-size: 16px;
  color: #444;
  white-space: nowrap;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RoomList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const RoomItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const JoinButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #a4302c;

  &:hover {
    background-color: #932c28;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

export const BackIcon = styled(_BackIcon)`
  width: 16px;
  height: 16px;
`;
