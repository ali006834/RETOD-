import styled, { css } from "styled-components";
import { ButtonSize, ButtonType } from ".";

type ButtonProps = {
  $block?: boolean;
  $size: ButtonSize;
  $buttonType: ButtonType;
  $width?: string;
  $height?: string;
  $fontSize?: string;
};

export const ButtonSizes: Record<ButtonSize, number> = {
  small: 38,
  middle: 40,
  large: 52,
};

export const Button = styled.button<ButtonProps>`
  text-align: center;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "HelveticaNeueLight" !important;

  ${({ $buttonType, theme }) => {
    if ($buttonType === "primary") {
      return css`
        color: #fff;
        background-color: #000;
        border: 1px solid #000;
        transition: all 0.1s ease-in-out;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #222;
          border: 1px solid #222;
        }
      `;
    }

    if ($buttonType === "secondary") {
      return css`
        color: #272727;
        background-color: transparent;
        border: 1px solid #000;
        transition: all 0.1s ease-in-out;
        cursor: pointer;
        &:hover {
          opacity: 0.4;
        }
      `;
    }

    return css`
      color: #000;
      background-color: #fff;
      border: 1px solid #000;
      transition-property: color, background-color, border;
      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
      cursor: pointer;

      :hover,
      :focus {
        color: #fff;
        background-color: #000;
        border: 1px solid #fff;
      }
    `;
  }}

  ${({ $size, $height, $fontSize }) => {
    if ($size === "small") {
      return css`
        font-size: ${$fontSize || "12px"};
        line-height: 20px;
        height: ${$height || `${ButtonSizes.small}px`};
        padding: 0 14px;
      `;
    }

    if ($size === "middle") {
      return css`
        font-size: ${$fontSize || "16px"};
        line-height: 28px;
        height: ${$height || `${ButtonSizes.middle}px`};
        padding: 0 24px;
      `;
    }

    if ($size === "large") {
      return css`
        font-size: ${$fontSize || "18px"};
        line-height: 30px;
        height: ${$height || `${ButtonSizes.large}px`};
        padding: 0 30px;
      `;
    }
  }}

  ${({ $block, $width }) => {
    if ($block) return `width: 100%;`;
    if ($width) return `width: ${$width};`;
    return "";
  }};

  :hover,
  :focus {
    opacity: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const AnchorButton = styled(Button).attrs({ as: "a" })`
  text-decoration: none;
  font-family: "HelveticaNeueLight" !important;
`;

type StyledLoadingProps = {
  $width?: string;
  $height?: string;
};

export const Loading = styled.span<StyledLoadingProps>`
  display: inline-block;
  margin-right: 8px;
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
`;
