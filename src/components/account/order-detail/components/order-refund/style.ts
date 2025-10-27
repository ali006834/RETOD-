import styled from "styled-components";

export const Header = styled.header`
  font-weight: 500;
  margin-bottom: 40px;
  font-family: "Helvetica" !important;
`;

export const ButtonWrapper = styled.div<{ $isSticky: boolean }>`
  position: ${({ $isSticky }) => ($isSticky ? "sticky" : "relative")};
  bottom: 10px;
  display: flex;
  justify-content: center;
  font-family: "Helvetica" !important;
`;

export const RefundSuccess = styled.p`
  font-family: "Helvetica" !important;

  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 24px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.8px;
`;
