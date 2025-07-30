import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const ProductTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
  font-family: "HelveticaNeueLight" !important;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 3px 0px;
  }
`;

export const ProductTag = styled.div`
  color: #5b5b5b;
  background-color: #eaeaea;
  padding: 6px 12px;
  font-size: 14px;
  font-family: "HelveticaNeueLight" !important;
  font-weight: 500;
  line-height: 24px;
  transition: background-color 0.2s ease;
  font-family: "HelveticaNeueLight" !important;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const ProductTagsRatio = styled.span`
  display: block;
`;
