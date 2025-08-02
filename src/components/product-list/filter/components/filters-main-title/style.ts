import styled, { css } from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
`;

export const FiltersTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
`;

export const ResultsText = styled.span`
  font-family: "Helvetica" !important;
  font-size: 14px;
  font-weight: 400;
  color: #979897;
  letter-spacing: -0.01em;
`;

export const Separator = styled.span`
  font-family: "Helvetica" !important;
  font-size: 14px;
  color: #ddd;
  font-weight: 300;
  user-select: none;
`;

export const ClearFiltersButton = styled.button`
  background: transparent;
  border: none;
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 8px;
  transition: all 0.2s ease;
  font-family: "Helvetica" !important;
  letter-spacing: -0.01em;


  &:hover {
    color: #666666;
    text-decoration: none;
  }

  &:active {
    color: #999999;
  }

  &::before {
    content: "✕";
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    transition: transform 0.2s ease;
      text-decoration: underline;
  }

  &:hover::before {
    transform: rotate(90deg);
    text-decoration: none;
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
  font-family: "Helvetica" !important;
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
