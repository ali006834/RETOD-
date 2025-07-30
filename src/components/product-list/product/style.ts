import breakpoints from "src/styles/breakpoints";
import styled, { css } from "styled-components";

export const Wrapper = styled.li``;

type ImageWrapperProps = {
  $hasStock: boolean;
};

export const ImageWrapper = styled.figure<ImageWrapperProps>`
  position: relative;
  margin-bottom: 7px;

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
    left: 12px;
    top: 12px;
    padding: 5px 10px;
  }
  top: 5px;
  left: 12px;
  padding: 5px 10px;
  text-wrap: nowrap;
  font-family: "HelveticaNeueLight" !important;
  ${({ $hasStock }) => {
    if ($hasStock) {
      return css`
        background-color: #fbfbfb;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  font-size: 10px;
  font-weight: 600;
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
  font-size: 10px;
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
export const ProductTags = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  z-index: 2;

  @media screen and (max-width: ${breakpoints.md}) {
    top: 5px;
    left: 5px;
  }
`;

export const ProductTag = styled.div`
  font-family: "HelveticaNeueThin";
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  font-size: 10px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 2px;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 3px 6px;
    font-size: 9px;
  }
`;

export const ProductTagText = styled.span`
  display: block;
`;

export const ProductTagsRatio = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 600;
  line-height: 24px;
`;

export const VariantType = styled.div`
  margin: 15px 0;
`;

export const VariantValue = styled.div``;

export const VariantTypeName = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 5px;
  color: #000;
  font-family: "HelveticaNeueLight" !important;
`;

export const VariantsWrapper = styled.div`
  z-index: -1;
`;
