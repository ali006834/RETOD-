import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin: 30px 0;
`;

export const QuantityButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 52px;
  flex-shrink: 0;
  background-color: #fff;
  border: 1px solid rgb(209, 213, 219);
  padding: 4px;
  color: #333;
  overflow: hidden;
  font-family: "HelveticaNeueMedium" !important;
`;

const QUANTITY_BUTTON_WIDTH = 40; //px
export const QuantityButton = styled.button`
  width: ${QUANTITY_BUTTON_WIDTH}px;
  height: 100%;
  display: inline-block;
  cursor: pointer;
  border: none;
  background-color: #fff;
  :focus {
    outline: none;
  }

  :hover,
  svg {
    width: 100%;
  }
`;

export const DecreaseButton = styled(QuantityButton)``;
export const Quantity = styled.span<{ $isFullWidth: boolean }>`
  display: inline-block;
  text-align: center;
  padding: 0 10px;
`;
export const IncreaseButton = styled(QuantityButton)``;

export const Icon = styled.span`
  margin-left: 8px;
`;
