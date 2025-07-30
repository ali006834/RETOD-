import React, { ReactNode } from "react";
import CloseSVG from "src/components/svg/close";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalTitle,
} from "./style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>
          <CloseSVG />
        </ModalCloseButton>
        <ModalTitle>{title}</ModalTitle>
        {children}
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginTop: "24px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Güncelle
        </button>{" "}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
