import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { TeacherChartBtn } from '../StudentChart/StudentChart.styled';
import {
  CloseButtonWrapper,
  ModalContent,
  ModalOverlay,
  QRContainer,
} from './TeacherQuiz.styled';

export const QRCodeModal = ({ onClose, isOpen, url }) => {
  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <QRContainer>
            <QRCodeSVG
              value={`${url}?isOffline=true`}
              size={1024}
              style={{ width: '100%', height: '100%' }}
            />
            <CloseButtonWrapper>
              <TeacherChartBtn onClick={onClose}>Close</TeacherChartBtn>
            </CloseButtonWrapper>
          </QRContainer>
        </ModalContent>
      </ModalOverlay>
    )
  );
};
