import React from 'react';
import styled from 'styled-components';
import { QRPedagogiumLogistics2 } from './TeacherQuiz.styled';
import { TeacherChartBtn } from '../StudentChart/StudentChart.styled';

// Стилі для модального вікна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 65%;
  width: 50%;
`;

const CloseButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const QRCodeModal = ({ onClose, isOpen }) => {
  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <QRPedagogiumLogistics2 />
          <CloseButtonWrapper>
            <TeacherChartBtn onClick={onClose}>Close</TeacherChartBtn>
          </CloseButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    )
  );
};
