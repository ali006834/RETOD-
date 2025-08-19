import breakpoints from "src/styles/breakpoints";
import styled, { css } from "styled-components";

export const Wrapper = styled.li``;

type ImageWrapperProps = {
  $hasStock: boolean;
};

export const ImageWrapper = styled.figure<ImageWrapperProps>`
  position: relative;

  @media only screen and (max-width: 600px) {
    margin-bottom: 0px;
  }

  ${({ $hasStock }) => {
    if ($hasStock) return ``;
    return css`
      :after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(34, 37, 42, 0.4);
      }
    `;
  }};
`;

type DiscountBadgeProps = {
  $hasStock: boolean;
};

export const DiscountBadge = styled.div<DiscountBadgeProps>`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${breakpoints.md}) {
    right: 10px;
    top: 10px;
    padding: 2px 4px;
  }
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  text-wrap: nowrap;
  font-family: "Helvetica" !important;
  font-weight: 400;
  ${({ $hasStock }) => {
    if ($hasStock) {
      return css`
        background-color: #fbfbfb;
        color: #000;
      `;
    }
    return css`
      background-color: red;
      color: #fff;
    `;
  }};

  text-align: center;
`;
export const DiscountBadgeDiscountRatio = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
`;
export const DiscountBadgeSoldOut = styled.span`
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
`;
export const DiscountBadgeDiscountText = styled.span`
  display: block;
  font-size: 12px;
  line-height: 16px;
`;
export const Title = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
export const PriceWrapper = styled.div``;

export const SellPrice = styled.span`
  color: ${({ theme }) => theme.color.sellPrice};
  margin-right: 8px;
  text-decoration: line-through;
`;

type FinalPriceProps = {
  $hasStock: boolean;
};

export const FinalPrice = styled.span<FinalPriceProps>`
  color: ${({ theme, $hasStock }) =>
    $hasStock ? theme.color.finalPrice : "#22252A"};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 14px;
  }
`;

export const BoxSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #dfe2e6;
`;

export const ProductTags = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0px 0px;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 3px 0px;
    position: relative;
  }
`;

export const ProductTag = styled.div`
  color: #656565;
  background: none;
  border: none;
  padding: 2px 0px;
  font-size: 12px;
  font-family: "Helvetica" !important;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: .15em;
  line-height: 1.5;
  transition: color 0.2s ease;

  &:hover {
    color: #979897;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 9px;
    line-height: 1.2;
    letter-spacing: 0.05em;
  }
`;

export const ProductTagsRatio = styled.span`
  display: block;
`;

export const VariantType = styled.div`
  margin: 15px 0;
`;

export const VariantValue = styled.div``;

export const VariantTypeName = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 5px;
  color: #000;
  font-family: "Helvetica" !important;
`;

export const VariantsWrapper = styled.div``;
