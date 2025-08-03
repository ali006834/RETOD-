import styled from "styled-components";
import { FORM_ITEM_MARGIN_BOTTOM } from "../components/form/form-item/style";

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e293b;
`;

export const Footer = styled.footer`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  color: #64748b;

  a {
    color: #4f46e5;
    font-weight: 600;
    text-decoration: none;
    margin-left: 5px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: ${FORM_ITEM_MARGIN_BOTTOM}px;
`;
