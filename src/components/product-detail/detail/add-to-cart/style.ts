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
  font-family: "Helvetica" !important;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ActionButtonsGroup = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`;

export const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(209, 213, 219);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgb(156, 163, 175);
    background-color: rgb(249, 250, 251);
  }

  &:focus {
    outline: none;
    border-color: rgb(99, 102, 241);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
