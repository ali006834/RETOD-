import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 32px;
  list-style-type: none;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const NoProducts = styled.div`
  margin-top: 40px;
  text-align: center;
  font-family: "Helvetica" !important;
  color: #6b7280;
  a {
    color: #000;
    text-decoration: underline;
    font-weight: 700;
    font-family: "Helvetica" !important;
  }
`;

export const NoProductsTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const ProductWrapper = styled.li`
  position: relative;
  max-width: 300px;
  max-height: 500px;
  aspect-ratio: 2/3;
  margin-bottom: 76px;

  @media (max-width: 1024px) {
    max-width: 300px;
    max-height: 600px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 400px;
    margin-bottom: 40px;
  }

  @media (max-width: 376px) {
    max-width: 170px;
    max-height: 350px;
    margin-bottom: 40px;
  }
`;

export const ProductFavoriteButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  color: red;
  background-color: transparent;
  z-index: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid black;
  cursor: pointer;
`;
