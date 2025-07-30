import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

export const PageNumberButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "black" : "white")};
  color: ${({ active }) => (active ? "#fff" : "black")};
  border: 1px solid #ccc;
  border-radius: 0px;
  padding: 16px 23px;
  margin-bottom: 20px;
  font-size:17px
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  pointer-events: ${({ active }) => (active ? "none" : "auto")};

  &:hover {
    background-color: ${({ active }) => (active ? "black" : "black")};
    color: ${({ active }) => (active ? "white" : "white")};
  }

  @media (max-width: 1040px) {
    padding: 11px 18px;
    font-size:13px;

  }
  `;
  
//   @media (max-width: 768px) {
//    padding: 8px 12px;
//    font-size:11px;

//  }