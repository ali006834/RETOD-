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
      border-bottom: 0.5px solid #d1d5db;
    `};
`;

export const FilterSvg = styled.div``;

export const FilterTitleWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: none;
  cursor: pointer;
  overflow: visible;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  color: #333;
  font-family: "Helvetica" !important;
  font-weight: 400;

  img {
    width: 20px !important;
    height: 20px !important;
  }
`;

export const FilterTitleExpandButton = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition: transform 0.3s ease;
  border-radius: 100%;

  /* Hover efekti */
  &:hover {
    background-color: #e0e0e0;
  }
  transform: ${({ active }) =>
    active
      ? "rotate(180deg)"
      : "rotate(0deg)"}; /* "+" ve "-" simgesine döndürür */
`;

export const FiltersContent = styled.div<{ active: boolean }>`
  overflow: auto;
  padding: 0 10px;
  max-height: ${({ active }) => (active ? "500px" : "0")};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: max-height 0.6s ease, opacity 0.6s ease;

  /* Scrollbar'ı inceltmek için */
  &::-webkit-scrollbar {
    width: 2px; /* Dikey scrollbar için */
    height: 2px; /* Yatay scrollbar için */
  }
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
