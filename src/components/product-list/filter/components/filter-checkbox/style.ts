import styled from "styled-components";

type FilterCheckboxLabelProps = {
  $isSelected: boolean;
};

export const FilterCheckboxLabel = styled.div<FilterCheckboxLabelProps>`
  font-weight: ${({ $isSelected }) => ($isSelected ? 400 : 300)};
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica" !important;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorSquare = styled.div<{ $colorCode: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ $colorCode }) => $colorCode};
  border: 1px solid #ddd;
  border-radius: 50%;
`;
