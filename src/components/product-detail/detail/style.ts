import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Title = styled.h1`
  font-family: "Helvetica" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  color: #000;
  padding-right: 32px;
  margin-bottom: 6px;
  text-transform: capitalize;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 8px; // (TitleLineHeight - FavoriteButtonHeight) / 2
  right: 0;
  width: 32px;
  height: 32px;
  color: #000;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media (max-width: 1200px) {
    right: -20px;
  }
`;

export const PriceWrapper = styled.div`
  margin-bottom: 24px;
`;

export const SellPrice = styled.span`
  font-size: 20px;
  line-height: 28px;
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 8px;
`;
export const Price = styled.span`
  color: "#d14600";
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

export const VariantsWrapper = styled.div``;
export const VariantTypeBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
export const VariantTypeNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 14px;
  }
`;
export const VariantTypeName = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #000;
  font-family: "Helvetica" !important;
`;
export const VariantType = styled.div`
  margin: 35px 0;
`;

export const VariantValue = styled.div``;

export const BoxSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 12px;

  border: 1px solid #dfe2e6;
`;

export const DescriptionWrapper = styled.div`
  padding: 12px 0px;
  margin-top: 0px;
  margin-bottom: 20px;
  @media (max-width: ${breakpoints.md}) {
    padding: 12px 0;
    margin-top: 32px;
  }
`;
export const DescriptionTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Helvetica" !important;
`;
export const Description = styled.div<{ $isExpanded: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 28px;
  font-family: "Helvetica" !important;
  text-align: justify !important;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}

  span {
    font-family: "Helvetica" !important;
    font-weight: 400;
    color: #3b3b3b !important;
    font-size: 12px !important;
    text-align: justify !important;
  }
  ,
  p {
    font-family: "Helvetica" !important;
    font-weight: 400;
    color: #3b3b3b !important;
    font-size: 12px !important;
    text-align: justify !important;
  }
`;

export const ProductAttributesWrapper = styled.div`
  margin-top: 4px;
  padding: 4px 8px;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    font-family: "Helvetica" !important;
    color: #444;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #222;
      font-weight: 400;
      margin-right: 8px;
    }
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

export const DescriptionWrapperTopTaksit = styled.div`
  padding: 0 0px;

  @media (max-width: ${breakpoints.md}) {
    padding: 0 10px;
  }

  img:first-child {
    width: 30px;
    height: 30px;
  }
`;

export const SocialShareWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: unset;
  }
`;

export const SocialShareTitle = styled.h4`
  display: inline-block;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  margin-right: 12px;
`;

export const SocialMediaWrapper = styled.ul`
  display: inline-block;
`;

export const SocialMedia = styled.li`
  display: inline-block;

  margin-right: 16px;
  :last-child {
    margin-right: 0;
  }
`;

export const SocialMediaIcon = styled.a`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #000000;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-family: "Helvetica" !important;
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
  // text-decoration: underline;
  margin-top: 4px;
  padding: 0;

  background-color: #222;
  color: #fff;
  padding: 4px 8px;

  &:hover {
    opacity: 0.7;
  }
`;
