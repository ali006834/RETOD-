import styled, { css } from "styled-components";

export const BoxWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 10px;
  background: trasparant;
  padding: 10px;
  white-space: nowrap;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

type Props = {
  $selected: boolean;
  $disabled?: boolean;
};

export const Box = styled.button<Props>`
  padding: 4px;
  font-size: 10px;
  line-height: 24px;
  background: #ffffff;
  border: 1px solid #dfe2e6;
  cursor: pointer;
  font-family: "Helvetica" !important;

  ${({ $selected }) =>
    $selected &&
    css`
      background: #ffffff;
      border: 2px solid #222;
      font-size: 10px;
    `};

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: #dfe2e6;
      background: #fafafa;
      border: 1px solid #dfe2e6;
    `};
`;
