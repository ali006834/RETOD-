import styled, { css } from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FiltersTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
`;

export const ClearFiltersButton = styled.button`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  // border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "HelveticaNeueMedium" !important;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  letter-spacing: -0.01em;

  &:hover {
    background: #6b7280;
    color: #ffffff;
    border-color: #6b7280;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: "";
    width: 14px;
    height: 14px;
    display: inline-block;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'/%3E%3Cpath d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.2s ease;
  }

  &:hover::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h18'/%3E%3Cpath d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'/%3E%3Cpath d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
    // border-radius: 10px;

    &::before {
      width: 12px;
      height: 12px;
    }
  }
`;

// Alternatif stil - daha minimal
export const ClearFiltersButtonMinimal = styled.button`
  background: transparent;
  border: 1px solid #000000;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: "HelveticaNeueMedium" !important;
  letter-spacing: -0.01em;

  &:hover {
    background: #000000;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "✕";
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    transition: transform 0.2s ease;
  }

  &:hover::before {
    transform: rotate(90deg);
  }
`;
