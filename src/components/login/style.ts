import styled from "styled-components";
import { FORM_ITEM_MARGIN_BOTTOM } from "../components/form/form-item/style";

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 72px;
  margin-bottom: 150px;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 36px;
  line-height: 56px;
  margin-bottom: 24px;
  font-family: "HelveticaNeueMedium" !important;
`;

export const Footer = styled.footer`
  margin-top: 12px;
  font-size: 11px;
  line-height: 28px;
  font-family: "HelveticaNeueMedium" !important;
  text-align: center;
  text-underline-offset: 5px;

  a {
    font-weight: 400;
    color: #121314;
    font-family: "HelveticaNeueBold" !important;
  }
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: ${FORM_ITEM_MARGIN_BOTTOM}px;
`;
