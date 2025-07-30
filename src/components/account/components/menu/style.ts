import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const DesktopTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #2d3748;
  font-family: "HelveticaNeueBold" !important;
`;

export const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: opacity 0.3s ease;
`;

export const Wrapper = styled.nav`
  flex-shrink: 0;
  display: inline-block;

  @media screen and (max-width: ${breakpoints.lg}) {
    position: fixed;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    bottom: 0;
    top: unset;
    overflow: auto;
    max-height: 100vh;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 8px;
`;

//= Togle

export const ToggleButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #4338ca;
  // border-radius: 50%;
  color: #fff;
  border: none;
  font-size: 24px;
  z-index: 101;
  padding: 12px;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
    // transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
  padding: 0 12px;
  color: #1a202c;
  font-family: "HelveticaNeueThin" !important;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 8px 0;
  }
`;

type ListItemProps = {
  $selected?: boolean;
};

export const ListItem = styled.li<ListItemProps>`
  margin-bottom: 8px;
  transition: all 0.2s ease;

  & > * {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 1.5;
    padding: 12px 16px;
    color: ${({ $selected }) => ($selected ? "#000" : "#222")};
    font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
    font-family: "HelveticaNeueLight" !important;
    text-decoration: none;
    // border-radius: 8px;
    transition: all 0.2s ease;
    background-color: ${({ $selected }) =>
      $selected ? "#f0f0f0" : "transparent"};

    &:hover {
      background-color: ${({ $selected }) => ($selected ? "#ccc" : "#f0f0f0")};
      color: ${({ $selected }) => ($selected ? "#000" : "#222")};
    }
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    color: red !important;
    gap: 8px;
    justify-content: flex-start;
    font-weight: 600;
    font-family: "HelveticaNeueLight" !important;

    &:hover {
      background-color: #fff5f5 !important;
      color: rgb(231, 13, 13) !important;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }
`;
