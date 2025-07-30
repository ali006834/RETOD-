import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const InnerWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 100px;
  margin-top: 40px;
  margin-bottom: 80px;

  @media screen and (max-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const Main = styled.div`
  grid-column: span 2 / span 2;
`;
