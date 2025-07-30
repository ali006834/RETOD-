import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1380px;
  margin: auto;
`;
export const Cart = styled.div`
  margin-top: 22px;
  height: 75vh;
  overflow: auto;

  /* Scrollbar'ı incelt */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media screen and (max-width: 600px) {
    margin-top: 10px;
    height: 65vh;
  }
`;
export const Title = styled.h1`
  font-size: 18px;
  line-height: 48px;
  margin-bottom: 10px;
  padding: 0 10px;
  font-family: "HelveticaNeueBold" !important;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 10px;
  overflow: auto;
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
export const Summary = styled.aside``;

export const ItemsHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  border-bottom: 1px solid #eeeeee;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 0;
  font-family: "HelveticaNeueBold" !important;

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
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 12px;
  box-sizing: border-box;
  text-align: center;
`;

export const BoxTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 24px;
  font-family: "HelveticaNeueMedium" !important;
`;

export const SummaryBoxInner = styled.div``;
export const SummaryBoxText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
  color: #000;
  font-family: "HelveticaNeueMedium" !important;
`;
export const TotalFinalPrice = styled(SummaryBoxText)`
  border-top: 1px solid #eeeeee;
  padding-top: 8px;
  color: #000;
  font-weight: 500;
  margin-top: 8px;
  font-family: "HelveticaNeueBold" !important;
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
    font-family: "HelveticaNeueMedium" !important;
    text-underline-offset: 6px;
  }
  a:first-child {
    background-color: #000;
    border: 1px solid #000;
    text-align: center;
    padding: 15px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
    display: block;
  }
  a:first-child:hover {
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
  }
`;

export const SummaryFreeShippingText = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  margin-top: 18px;
  text-align: center;
  font-family: "HelveticaNeueMedium" !important;

  span {
    display: inline-block;
    vertical-align: middle;
    font-family: "HelveticaNeueMedium" !important;
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
  font-family: "HelveticaNeueMedium" !important;
  width: ${REMOVE_COUPON_BUTTON_WIDTH}px;
  height: calc(100% - 2px);
  right: 1px;
  :hover,
  :focus {
    color: #fff;
    background-color: red;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const BottomContent = styled.div`
  width: 100%;
`;
export const PriceText = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-family: "HelveticaNeueMedium" !important;
`;
export const ButtonPayment = styled.div`
  width: 100%;

  a {
    text-decoration: none;
    color: #fff;
    font-family: "HelveticaNeueMedium" !important;
    display: block;
    background-color: #000;
    text-align: center;
    padding: 15px;
    margin-top: 10px;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

interface TabProps {
  active?: boolean;
}

export const Tab = styled.button<TabProps>`
  flex: 1;
  padding: 15px 0;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "#000" : "#999")};
  font-family: "HelveticaNeueMedium" !important;

  &.active {
    color: #000;
    // font-weight: bold;
    border-bottom: 2px solid #000;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #000;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  // &:hover {
  //   color: #000;
  // }

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 14px;
    padding: 12px 0;
  }
`;

export const CouponContainer = styled.div`
  display: flex;
  margin-top: 60px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

export const CouponInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #000;
  }
`;

export const ApplyButton = styled.button`
  padding: 0 20px;
  background: #000;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 14px;
  font-family: "HelveticaNeueMedium" !important;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;

export const EmptyWishlist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyWishlistItem = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  font-family: "HelveticaNeueLight" !important;

  color: #999;
  font-size: 13px;
  gap: 8px;
`;

export const Span1 = styled.span`
  color: #999;
  font-size: 24px;
  font-weight: bold;
`;

export const Span2 = styled.span`
  color: #999;
  font-size: 13px;
`;

export const Span3 = styled.span`
  color: #999;
  font-size: 11px;
  margin-bottom: 5px;
`;

//= Ürünler
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const ProductInfo = styled.div`
  padding: 12px;
`;

export const ProductTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PriceContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Price = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #000;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const DiscountPrice = styled.span`
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 10px;
  row-gap: 32px;
  list-style-type: none;
`;

export const NoProducts = styled.div`
  margin-top: 40px;
  text-align: center;
  font-family: "HelveticaNeueLight" !important;
  color: #6b7280;
  a {
    color: #000;
    text-decoration: underline;
    font-weight: 700;
    font-family: "HelveticaNeueLight" !important;
  }
`;

export const NoProductsTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const ProductWrapper = styled.li`
  position: relative;
  max-width: 300px;
  max-height: 460px;
  margin: auto;
  aspect-ratio: 2/3;
  margin-bottom: 76px;

  @media (max-width: 768px) {
    // max-width: 200px;
    max-height: 500px;
    margin: auto;
    padding: 0 10px;
    margin-bottom: 40px;
  }
`;

export const ProductFavoriteButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  color: red;
  background-color: transparent;
  z-index: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid black;
  cursor: pointer;
`;
