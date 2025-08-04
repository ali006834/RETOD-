import styled from "styled-components";

export const AddressBoxes = styled.ul<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "grid" : "none")};
  grid-template-columns: repeat(1, 1fr);
  column-gap: 16px;
  row-gap: 32px;
  padding-bottom: 10px;
  font-weight: 400;
  font-family: "Helvetica" !important;
`;
