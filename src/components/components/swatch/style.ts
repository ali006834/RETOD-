import styled, { css } from "styled-components";

export const ColorSwatchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-family: "HelveticaNeueLight" !important;
`;

export const ColorSwatch = styled.button<{
  $isSelected: boolean;
  $color: string;
  $noMargin?: boolean;
}>`
  width: 32px;
  height: 32px;
  padding: 6px;
  background-color: ${({ $color }) => $color};
  border: 1px solid black;
  margin: 10px;
  margin-left: 0px;
  cursor: pointer;

  ::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${({ $color }) => $color};
    border: 1px solid black;
    position: relative;
    box-shadow: 0px 0px 2px #000;
  }

  :last-child {
    margin-right: 0;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      outline-offset: 0px;
      border: 3px solid black;
      box-sizing: border-box;
    `};
`;

export const ImageSwatch = styled.button`
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  &:disabled {
    opacity: 50%;
  }
`;
export const ImageSwatchImg = styled.img<{ $isSelected: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0px;
  object-fit: contain;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      outline: 1px solid #77777b;
      outline-offset: 0px;
    `};
`;
