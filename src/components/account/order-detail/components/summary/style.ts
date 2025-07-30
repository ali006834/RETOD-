import { IkasAdjustmentType } from "@ikas/storefront";
import styled from "styled-components";

export const Summary = styled.div`
  padding: 10px;
  background: #e5e7eb;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const Title = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ContentItem = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const ContentItemTitle = styled.div`
  font-weight: 600;
`;

export const ContentItemText = styled.div`
  flex: 1 1 0%;
  text-align: right;
`;

export const OrderAdjustment = styled.div`
  display: flex;
`;

export const OrderAdjustmentTitle = styled.div`
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const OrderAdjustmentText = styled.div<{ $type: IkasAdjustmentType }>`
  flex: 1 1 0%;
  text-align: right;
  white-space: nowrap;

  color: ${({ $type, theme }) => {
    if ($type === IkasAdjustmentType.DECREMENT) {
      return theme.color.green;
    }
    return theme.color.red;
  }};
`;

export const PriceWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;

export const PriceTitle = styled.div`
  font-weight: 700;
`;

export const Price = styled.div`
  flex: 1 1 0%;
  text-align: right;
`;
