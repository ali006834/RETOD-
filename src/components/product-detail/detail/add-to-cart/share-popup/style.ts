import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: transparent;
`;

export const PopupContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 280px;
  z-index: 1001;
  animation: tooltipFadeIn 0.2s ease-out;

  /* Tooltip Arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    width: 260px;
    right: -0px;
    
    &::after {
      right: 44px;
    }
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f3f4f6;
`;

export const PopupTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  font-family: "HelveticaNeueMedium", sans-serif;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
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
  padding: 16px 20px 20px;
`;

export const CopyLinkSection = styled.div`
  margin-bottom: 20px;
`;

export const CopyLinkButton = styled.button`
  width: 100%;
  padding: 10px 14px;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  font-size: 13px;
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
    border-color: #222;
    background-color: #ddd;
  }
`;

export const SocialMediaSection = styled.div``;

export const SocialMediaTitle = styled.h4`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 10px 0;
  font-family: "HelveticaNeueMedium", sans-serif;
`;

export const SocialMediaButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const SocialButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: #222;
  }

  &:active {
    transform: translateY(0);
  }
`;