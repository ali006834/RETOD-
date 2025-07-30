import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

import Collapse from "src/components/components/collapse";

export const ProductAttributes = styled.div`
  margin-top: 20px;
`;

export const AttributeValueWrapper = styled(Collapse)`
  position: relative;
  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  padding-top: 12px;
  padding-bottom: 12px;

  .collapse-header {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: ${({ theme }) => theme.color.primaryText};
  }

  .collapse-children {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 28px;
    color: ${({ theme }) => theme.color.primaryText};
  }

  table {
    width: 100%;
  }
`;

export const DescriptionWrapperTop = styled.div`
  padding: 0 0px;

  @media (max-width: ${breakpoints.md}) {
    padding: 0 10px;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

export const DescriptionWrapperShortExplanation = styled.div`
  margin-top: 20px;
  max-height: 150px;
  overflow-y: auto;
  @media (max-width: ${breakpoints.md}) {
    padding: 0;
    margin-top: 10px;
    max-height: 100px; /* Mobilde daha küçük olsun */
  }

  /* Kaydırma çubuğu stilleri */
  &&::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &&::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &&::-webkit-scrollbar-track {
    background-color: #fafafa;
  }
`;

export const Description = styled.div`
  font-size: 14px !important;
  line-height: 1.375rem !important;
  font-weight: 300 !important;
  font-family: "HelveticaNeueLight" !important;

  span {
    color: #272727 !important;
    font-size: 14px !important;
    text-align: justify !important;

    @media only screen and (max-width: 600px) {
      text-align: left !important;
    }

    @media only screen and (max-width: 1200px) {
      font-size: 13px !important;
    }
  }
  ,
  p {
    color: #272727 !important;
    font-size: 14px !important;
    text-align: justify !important;

    @media only screen and (max-width: 1200px) {
      font-size: 10px !important;
    }

    @media only screen and (max-width: 600px) {
      text-align: left !important;
    }
  }
`;
