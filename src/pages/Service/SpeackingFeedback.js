import { Field, Form } from 'formik';
import styled from 'styled-components';
import { ReactComponent as ApStarIcon } from '../../img/svg/ap-star.svg';
import { ReactComponent as ApStarGrayIcon } from '../../img/svg/ap-star-gray.svg';

export const FeedbackFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 650px;
  padding-inline: 12px;
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 32px;
  background-color: #eeeeee;
  border-radius: 16px;
  border: 1px solid #0f645b;
  width: 100%;
`;

export const ApStar = styled(ApStarIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-inline: 8px;
`;

export const ApStarGray = styled(ApStarGrayIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-inline: 8px;
`;

export const StarsContainer = styled.div`
  display: flex;
  align-self: center;
`;

export const FreeAnswerArea = styled.textarea`
  padding: 5px;
  border: 1.5px solid var(--main-color);
  border-radius: 5px;
  outline: transparent;
  resize: none;
  width: 100%;
  height: 98px;
`;

export const FeedbackButton = styled.button`
  width: 100%;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 16px;
  background-color: #0f645b;
  transition: ease 300ms;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    opacity: 0.8;
  }
`;
