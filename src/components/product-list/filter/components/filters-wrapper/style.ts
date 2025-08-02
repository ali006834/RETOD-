import styled, { css } from "styled-components";

type FiltersWrapperProps = {
  $noBorder?: boolean;
};

export const FiltersWrapper = styled.div<FiltersWrapperProps>`
  ${({ $noBorder }) =>
    !$noBorder &&
    css`
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
    `};
`;

export const FilterTitleWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: white;
  border: none;
  border-bottom: 1px solid #d1d5db;
  cursor: pointer;
`;

export const FilterTitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  font-family: "Helvetica" !important;
  
`;

export const FilterTitleExpandButton = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  font-family: "Helvetica" !important;
`;
