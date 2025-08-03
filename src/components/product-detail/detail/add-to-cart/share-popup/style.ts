import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  min-width: 320px;
  max-width: 400px;
  z-index: 1001;
  animation: popupFadeIn 0.2s ease-out;

  @keyframes popupFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 480px) {
    min-width: 280px;
    max-width: 90vw;
    margin: 0 20px;
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f3f4f6;
`;

export const PopupTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  font-family: "HelveticaNeueMedium", sans-serif;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #374151;
  }
`;

export const PopupContent = styled.div`
  padding: 20px 24px 24px;
`;

export const CopyLinkSection = styled.div`
  margin-bottom: 24px;
`;

export const CopyLinkButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "HelveticaNeueMedium", sans-serif;

  &:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #d14600;
    background-color: #fef2f2;
  }
`;

export const SocialMediaSection = styled.div``;

export const SocialMediaTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 12px 0;
  font-family: "HelveticaNeueMedium", sans-serif;
`;

export const SocialMediaButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const SocialButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: #d14600;
  }

  &:active {
    transform: translateY(0);
  }
`;