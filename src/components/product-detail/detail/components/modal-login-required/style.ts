import { Link } from "@ikas/storefront";
import styled from "styled-components";

export const Text = styled.p`
  color: ${({ theme }) => theme.color.secondaryText};
  margin-bottom: 30px;
`;

export const Login = styled.div`
  margin-bottom: 8px;
  a {
    color: #fff;
  }
`;

export const Register = styled.div`
  a {
    color: #000;
    display: block;
    margin-top: 20px;
  }
`;
