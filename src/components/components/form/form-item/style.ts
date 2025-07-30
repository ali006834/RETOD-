import styled, { css } from "styled-components";
import { FormItemStatus } from ".";

type StyledStatusProp = {
  $status: FormItemStatus;
};

export const FORM_ITEM_MARGIN_BOTTOM = 20;
export const FormItemWrapper = styled.fieldset<{
  $noMargin: boolean;
}>`
  ${({ $noMargin }) =>
    !$noMargin &&
    css`
      margin-bottom: ${FORM_ITEM_MARGIN_BOTTOM}px;
    `};
  border: none;
`;
export const LabelChildrenWrapper = styled.div`
  display: block;
  margin-right: 5px;
`;
export const LabelWrapper = styled.div`
  margin-bottom: 4px;
  font-weight: 300;
  font-size: 15px;
  line-height: 28px;
  font-family: "HelveticaNeueLight" !important;
`;
export const Help = styled.div<StyledStatusProp>`
  margin-top: 8px;
  font-weight: 300;
  line-height: 28px;
  font-family: "HelveticaNeueLight" !important;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $status }) => {
    if ($status === "error") {
      return theme.color.red;
    }
    return "#000";
  }};
`;
