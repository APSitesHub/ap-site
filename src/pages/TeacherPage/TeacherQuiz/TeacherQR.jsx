import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';

// Стилі для модального вікна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
`;

const CloseButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const QRCodeModal = ({ qrValue, onClose, isOpen }) => {
  return isOpen && (
    <ModalOverlay>
      <ModalContent>
        <QRCode value={qrValue} size={200} />
        <CloseButtonWrapper>
          <button onClick={onClose}>
            Close
          </button>
        </CloseButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
