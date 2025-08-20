import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Item = styled.li`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 24px 0%;
  border-bottom: 1px solid #eeeeee;
  font-family: "Helvetica";
  text-align: left;
  width: 100%;

  @media screen and (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 0 5px;
    margin: 20px 0;
  }
`;


export const ItemProductImageAndNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const ItemProductImage = styled.picture`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

export const ItemProductName = styled.div`
  font-size: 14px;
  font-family: "Helvetica";
  padding-right: 2px;
  text-align: left;
  width: 100%;
`;

export const ItemProductVariantValuesText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #4b5563;
  font-family: "Helvetica";
  text-align: left;
  width: 100%;
`;

export const ItemRemove = styled.button`
  border: 1px solid #d1d5db;
  padding: 6px;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  @media only screen and (max-width: 600px) {
    border: 1px solid #d1d5db;
    padding: 4px;
    margin-left: 5px;
  }
`;

export const ItemPriceWrapper = styled.div`
  margin-bottom: 24px;
  font-size: 13px;
  line-height: 24px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const ItemSellPrice = styled.div`
  font-weight: 400;
  text-decoration: line-through;
  color: #6b7280;
`;

export const ItemPrice = styled.div`
  color: #d14600;
  font-weight: 600;
`;

export const ItemOptions = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #000;
`;

export const OptionFileDownloadButton = styled.button`
  svg {
    font-size: 20px;
    color: #000;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }

  span:first-child {
    margin-right: 4px;
  }

  :hover {
    color: #000;
  }
`;

export const OptionColorPicker = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
