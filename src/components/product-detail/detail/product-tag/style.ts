import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const ProductTags = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0px 0px;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 3px 0px;
    position: relative;
  }
`;

export const ProductTag = styled.div`
  color: #656565;
  background: none;
  border: none;
  padding: 2px 0px;
  font-size: 12px;
  font-family: "Helvetica" !important;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: .15em;
  line-height: 1.5;
  transition: color 0.2s ease;

  &:hover {
    color: #979897;
  }
`;

export const ProductTagsRatio = styled.span`
  display: block;
`; 