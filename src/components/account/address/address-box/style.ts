import styled from "styled-components";

export const AddressBox = styled.li`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #eeeeee;
  padding: 10px 0;
  font-family: "HelveticaNeueLight" !important;
`;

export const Title = styled.p`
  font-weight: 500;
  margin-bottom: 8px;
  flex-grow: 0;
  font-family: "HelveticaNeueBold" !important;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const AddressText = styled.p`
  flex-grow: 1;
  color: #6b7280;
  font-size: 14px;
`;

export const ButtonsWrapper = styled.footer`
  flex-grow: 0;
  display: flex;
  align-items: center;
  margin-top: 24px;
  gap: 24px;
`;

export const Button = styled.button<{ $type: boolean }>`
  font-size: 14px;
  color: #fff;
  background: ${({ $type }) => ($type ? "#9d1528" : "black")};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: "HelveticaNeueLight" !important;
  border: none;
  :hover {
    text-decoration: underline;
  }
`;
