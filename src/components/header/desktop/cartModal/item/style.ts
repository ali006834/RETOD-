import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const ItemWrapper = styled.div<{ $isRemoving?: boolean }>`
  transition: all 0.3s ease;
  transform: translateX(${({ $isRemoving }) => ($isRemoving ? "100%" : "0")});
  opacity: ${({ $isRemoving }) => ($isRemoving ? 0 : 1)};
  overflow: hidden;
`;



export const RemovedNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 8px 0;
  animation: fadeIn 0.3s ease;
  font-family: "Helvetica";
  font-weight: 300;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 14px;
    color: #666;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Item = styled.li`
  padding: 15px 0;
  font-weight: 300;
  font-family: "Helvetica" !important;
`;

export const ItemContent = styled.div`
  display: flex;
  gap: 16px;
`;

export const QuantityColumn = styled.div`
  grid-column: span 3 / span 3;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 2;
    grid-column: span 12 / span 12;
    text-align: center;
  }
`;

export const QuantityColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 1px;
`;

export const ItemImageWrapper = styled.div`
  width: 100px;
  height: 150px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ItemProductImageAndNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
`;

export const ItemProductImage = styled.picture`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

export const ItemProductName = styled.div`
  font-size: 14px;
  font-weight: 300;
  font-family: "Helvetica" !important;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemProductVariantValuesText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #4b5563;
  font-weight: 300;
  font-family: "Helvetica" !important;
`;

export const ItemRemove = styled.button`
  border: 1px solid #d1d5db;
  padding: 6px;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const ItemPriceWrapper = styled.div`
  margin-bottom: 24px;
  font-size: 12px;
  line-height: 20px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const ItemSellPrice = styled.div`
  font-weight: 400;
  text-decoration: line-through;
  color: #6b7280;
`;

export const ItemPrice = styled.div`
  color: #cf152d;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const ItemAttributes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4b5563;
  margin-bottom: 12px;
`;

export const Divider = styled.span`
  color: #d1d5db;
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 15px;
  margin: 10px 0;
  padding-bottom: 15px;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

export const QuantityEditorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f6f6f6;
  border-radius: 21px;
  padding: 0 8px;
  height: 42px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ActionButton = styled.button<{ $isActive?: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? "#e0e0e0" : "#f6f6f6")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  position: relative;
  overflow: hidden;

  &:hover {
    background: #e0e0e0;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// İkonlar arası geçiş için
export const IconTransition = styled.span<{ $show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ $show }) => ($show ? 1 : 0.7)});
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
`;

// Miktar düzenleyici açılır/kapanır animasyonu
export const QuantityEditorCollapse = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "80px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  margin-top: ${({ $open }) => ($open ? "12px" : "0")};
`;

export const ItemOptions = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #000;
`;

export const OptionFileDownloadButton = styled.button`
  svg {
    font-size: 20px;
    color: #000;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }

  span:first-child {
    margin-right: 4px;
  }

  :hover {
    color: #000;
  }
`;

export const OptionColorPicker = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  width: 32px;
  height: 32px;
  color: #000;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 32px;
  list-style-type: none;

  @media screen and (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const NoProducts = styled.div`
  margin-top: 40px;
  text-align: center;
  font-weight: 300;
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
  max-height: 400px;
  aspect-ratio: 2/3;
  margin-bottom: 76px;

  @media (max-width: 1024px) {
    max-width: 200px;
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    min-width: 280px;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
`;
