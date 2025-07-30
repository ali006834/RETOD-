// src/styles/theme.ts
import { DefaultTheme } from "styled-components";

// Sabitler
export const SIDENAV_WIDTH = 350;
export const SIDENAV_WIDTH_CART = 400;

// Tip tanımları
type FontSizeKeys =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";
type ColorKeys =
  | "headerBg"
  | "headerText"
  | "sidenavBg"
  | "sidenavText"
  | "footerBg"
  | "primaryText"
  | "secondaryText"
  | "finalPrice"
  | "sellPrice"
  | "button"
  | "buttonBg"
  | "secondaryButton"
  | "secondaryButtonBg"
  | "border"
  | "inputBorder"
  | "inputBackground"
  | "inputText"
  | "checkboxBorder"
  | "checkboxBg"
  | "checkbox"
  | "productBadgeBg"
  | "productBadgeText"
  | "link"
  | "white"
  | "black"
  | "red"
  | "green"
  | "blue"
  | "orange";

interface ThemeColors {
  [key: string]: string;
  headerBg: string;
  headerText: string;
  sidenavBg: string;
  sidenavText: string;
  footerBg: string;
  primaryText: string;
  secondaryText: string;
  finalPrice: string;
  sellPrice: string;
  button: string;
  buttonBg: string;
  secondaryButton: string;
  secondaryButtonBg: string;
  border: string;
  inputBorder: string;
  inputBackground: string;
  inputText: string;
  checkboxBorder: string;
  checkboxBg: string;
  checkbox: string;
  productBadgeBg: string;
  productBadgeText: string;
  link: string;
  white: string;
  black: string;
  red: string;
  green: string;
  blue: string;
  orange: string;
}

interface Theme {
  zIndex: {
    headerNavigationItem: number;
    accountMobileMenu: number;
    accountMobileToggleMenuButton: number;
    sidenav: number;
    modal: number;
  };
  fontSize: Record<FontSizeKeys, string>;
  inputBorderRadius: string;
  color: ThemeColors;
  spacing?: Record<string, string>; // Ek olarak spacing ekleyebiliriz
  breakpoints?: Record<string, string>; // Responsive breakpoint'ler
}

// Tema nesnesi
export const theme: Theme = {
  zIndex: {
    headerNavigationItem: 1,
    accountMobileMenu: 2,
    accountMobileToggleMenuButton: 3,
    sidenav: 9,
    modal: 10,
  },
  fontSize: {
    xs: ".75rem",
    sm: ".875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },
  inputBorderRadius: "12px",
  color: {
    headerBg: "var(--header-background-color)",
    headerText: "var(--header-text-color)",
    sidenavBg: "var(--sidenav-bg)",
    sidenavText: "var(--sidenav-text)",
    footerBg: "var(--footer-background-color)",
    primaryText: "var(--primary-text-color)",
    secondaryText: "var(--secondary-text-color)",
    finalPrice: "var(--price-color)",
    sellPrice: "var(--strikethrough-price-color)",
    button: "var(--button-color)",
    buttonBg: "var(--button-background-color)",
    secondaryButton: "var(--secondary-button-color)",
    secondaryButtonBg: "var(--secondary-button-background-color)",
    border: "var(--border-color)",
    inputBorder: "var(--input-border-color)",
    inputBackground: "var(--input-background-color)",
    inputText: "var(--input-text)",
    checkboxBorder: "var(--checkbox-border)",
    checkboxBg: "var(--checkbox-bg)",
    checkbox: "var(--checkbox)",
    productBadgeBg: "var(--product-badge-bg)",
    productBadgeText: "var(--product-badge-text)",
    link: "var(--link)",
    white: "#FFFFFF",
    black: "#000000",
    red: "#ed2727",
    green: "#52c41a",
    blue: "#2563eb",
    orange: "#ff9800",
  },
  // İsteğe bağlı ek özellikler
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

// styled-components için tema tipini genişlet
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export type { Theme };
