import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

type ModalProps = {
  $visible: boolean;
};

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  overflow: hidden auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999999999999999 !important;
  font-family: "HelveticaNeueLight" !important;

  display: ${({ $visible }) => ($visible ? "flex" : "none")};
`;

export const ModalInner = styled.div.attrs({
  "aria-label": "modal-inner",
})`
  position: relative;
  padding: 48px;
  margin: auto;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 12px;
  z-index: 999; !important;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 48px 24px;
  }

  // animate?
`;

export const CloseButton = styled.button.attrs({
  "aria-label": "modal-close",
})`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background: none;
`;

export const ModalContent = styled.div.attrs({
  "aria-label": "modal-content",
})``;

export const ModalTitle = styled.div.attrs({
  "aria-label": "modal-title",
})`
  margin-bottom: 20px;
  font-weight: 700;
`;

export const ModalChildren = styled.div``;
