import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

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

export const DescriptionWrapper = styled.div`
  margin-top: 20px;
  overflow: auto;

  @media (max-width: ${breakpoints.md}) {
    padding: 0;
    margin-top: 10px;
  }

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
