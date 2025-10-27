import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  row-gap: 64px;
  font-family: "Helvetica" !important;

  @media screen and (min-width: ${breakpoints.lg}) {
    gap: 64px;
  }
`;

export const Section = styled.section`
  grid-column: span 12 / span 12;

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-column: span 8 / span 8;
  }
`;
export const Aside = styled.aside`
  grid-column: span 12 / span 12;

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-column: span 4 / span 4;
  }
`;
