import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1380px;
  margin: auto;
  padding: 0 10px;
  box-sizing: border-box;
  @media screen and (max-width: ${breakpoints.md}) {
    padding: 0 5px;
  }
`;
export const Cart = styled.div`
  margin-top: 24px;
  margin-bottom: 80px;
`;
export const Title = styled.h1`
  font-size: 22px;
  line-height: 48px;
  margin-bottom: 24px;
  font-family: "HelveticaNeueThin !important";
  @media screen and (max-width: ${breakpoints.md}) {
    line-height: 0;
    padding-left: 10px;
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media screen and (max-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
export const Main = styled.main`
  grid-column: span 2 / span 2;
`;
export const Items = styled.ul``;
export const Summary = styled.aside`
  height: 100%;
`;

export const ItemsHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  border-bottom: 1px solid #eeeeee;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 0;
  font-family: "HelveticaNeueThin !important";

  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const ProductColumn = styled.div`
  grid-column: span 6 / span 6;

  @media screen and (max-width: ${breakpoints.sm}) {
    grid-column: span 9 / span 9;
    margin-bottom: 20px;
  }
`;
export const QuantityColumn = styled.div`
  grid-column: span 3 / span 3;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 2;
    grid-column: span 12 / span 12;
    text-align: center;
  }
`;

export const PriceColumn = styled.div`
  grid-column: span 2 / span 2;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 2 / span 2;
  }
`;

export const RemoveColumn = styled.div`
  grid-column: span 1 / span 1;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 1 / span 1;
  }
`;

// SUMMARY
export const SummaryBox = styled.div`
  width: 100%;
  padding: 24px;
  background: #f7f7f9;
  border-radius: 12px;
  box-sizing: border-box;
  position: sticky;
  top: 10px;
`;

export const BoxTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 24px;
  font-family: "HelveticaNeueMedium";
`;

export const SummaryBoxInner = styled.div``;
export const SummaryBoxText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
  color: #000;
  font-family: "HelveticaNeueMedium";
`;
export const TotalFinalPrice = styled(SummaryBoxText)`
  border-top: 1px solid #eeeeee;
  padding-top: 8px;
  color: #000;
  font-weight: 500;
  margin-top: 8px;
  font-family: "HelveticaNeueMedium";
`;

export const SummaryButtonWrapper = styled.div`
  margin-top: 24px;
  > *:first-child {
    margin-bottom: 12px;
  }
  a {
    color: #333;
    font-size: 14px;
    display: block;
    font-family: "HelveticaNeueMedium";
    text-underline-offset: 6px;
    text-align: center;
    margin-top: 30px;
  }
  a:first-child {
    background-color: #000;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-family: "HelveticaNeueThin";
    color: #fff;
    font-size: 18px;
    display: block;
    transition: all 0.1s ease-in-out;
  }
  a:first-child:hover {
    background-color: #434343;
  }
`;

export const SummaryFreeShippingText = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  margin-top: 18px;
  text-align: center;
  font-family: "HelveticaNeueMedium";

  span {
    display: inline-block;
    vertical-align: middle;
    font-family: "HelveticaNeueMedium";
  }
  span:first-child {
    margin-right: 8px;
  }
`;

export const Coupon = styled.div`
  margin-top: 20px;
`;

export const REMOVE_COUPON_BUTTON_WIDTH = 30;
export const RemoveCouponButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-family: "HelveticaNeueMedium";
  width: ${REMOVE_COUPON_BUTTON_WIDTH}px;
  height: calc(100% - 2px);
  right: 1px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
