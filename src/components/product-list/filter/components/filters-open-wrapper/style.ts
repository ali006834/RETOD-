import styled, { css } from "styled-components";

type FiltersWrapperProps = {
  $noBorder?: boolean;
};

export const FiltersWrapper = styled.div<FiltersWrapperProps>`
  ${({ $noBorder }) =>
    !$noBorder &&
    css`
      padding-bottom: 5px;
      margin: 10px 0;
      border-bottom: 1px solid #d1d5db;
    `};
`;

export const FilterTitleWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

export const FilterTitle = styled.p`
  font-size: 16px;
  color: #3a3a3a;
  font-family: "HelveticaNeueLight" !important;
  font-weight: 500;
`;

export const FilterTitleExpandButton = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;
