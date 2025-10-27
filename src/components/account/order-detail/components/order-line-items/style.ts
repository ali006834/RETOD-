import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  font-family: "Helvetica" !important;
  @media screen and (max-width: ${breakpoints.sm}) {
    display: block;
  }
`;

export const Picture = styled.picture`
  display: block;
  width: 150px;
  flex-shrink: 0;
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const Content = styled.div`
  @media screen and (min-width: ${breakpoints.md}) {
    margin-left: 16px;
  }
  @media screen and (max-width: ${breakpoints.md}) {
    text-align: center;
  }
`;

export const VariantName = styled.div`
  margin-bottom: 8px;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }
`;

export const Quantity = styled.span`
  color: red;
`;

export const VariantType = styled.div`
  color: #000;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const Price = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

export const RefundQuantitySelectWrapper = styled.div`
  margin-top: 20px;

  select {
    width: unset;
  }
`;
