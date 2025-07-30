import styled from "styled-components";

type FilterCheckboxLabelProps = {
  $isSelected: boolean;
};

export const FilterCheckboxLabel = styled.div<FilterCheckboxLabelProps>`
  font-weight: ${({ $isSelected }) => ($isSelected ? 400 : 300)};
  font-size: 16px;
  line-height: 24px;
  font-family: "HelveticaNeueLight" !important;
  cursor: pointer;
  padding: 5px;
`;
