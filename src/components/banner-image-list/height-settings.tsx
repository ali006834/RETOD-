import { BannerImageListProps } from "../__generated__/types";

// Extended props type for overlay heights (static string values)
export type ExtendedBannerImageListProps = BannerImageListProps & {
  // Grid 1 overlay heights
  gridOneProductOverlayHeight?: string;
  gridOneProductOverlayHeightMobile?: string;
  gridOneProductOverlayExpandedHeight?: string;
  gridOneProductOverlayExpandedHeightMobile?: string;
  // Grid 2 overlay heights
  gridTwoProductOverlayHeight?: string;
  gridTwoProductOverlayHeightMobile?: string;
  gridTwoProductOverlayExpandedHeight?: string;
  gridTwoProductOverlayExpandedHeightMobile?: string;
  // Grid 3 overlay heights
  gridThreeProductOverlayHeight?: string;
  gridThreeProductOverlayHeightMobile?: string;
  gridThreeProductOverlayExpandedHeight?: string;
  gridThreeProductOverlayExpandedHeightMobile?: string;
  // Grid 4 overlay heights
  gridFourProductOverlayHeight?: string;
  gridFourProductOverlayHeightMobile?: string;
  gridFourProductOverlayExpandedHeight?: string;
  gridFourProductOverlayExpandedHeightMobile?: string;
};

// Overlay height settings interface
export interface OverlayHeightSettings {
  gridOneProductOverlayHeight?: string;
  gridOneProductOverlayHeightMobile?: string;
  gridOneProductOverlayExpandedHeight?: string;
  gridOneProductOverlayExpandedHeightMobile?: string;
  gridTwoProductOverlayHeight?: string;
  gridTwoProductOverlayHeightMobile?: string;
  gridTwoProductOverlayExpandedHeight?: string;
  gridTwoProductOverlayExpandedHeightMobile?: string;
  gridThreeProductOverlayHeight?: string;
  gridThreeProductOverlayHeightMobile?: string;
  gridThreeProductOverlayExpandedHeight?: string;
  gridThreeProductOverlayExpandedHeightMobile?: string;
  gridFourProductOverlayHeight?: string;
  gridFourProductOverlayHeightMobile?: string;
  gridFourProductOverlayExpandedHeight?: string;
  gridFourProductOverlayExpandedHeightMobile?: string;
}

// Get overlay height based on grid count, device type, and expanded state
export const getOverlayHeight = (
  gridCount: number,
  isMobileDevice: boolean,
  isExpanded: boolean,
  settings: OverlayHeightSettings
): string => {
  // Grid 1
  if (gridCount === 1) {
    if (isExpanded) {
      return isMobileDevice
        ? settings.gridOneProductOverlayExpandedHeightMobile ?? "35%"
        : settings.gridOneProductOverlayExpandedHeight ?? "35%";
    } else {
      return isMobileDevice
        ? settings.gridOneProductOverlayHeightMobile ?? "15%"
        : settings.gridOneProductOverlayHeight ?? "20%";
    }
  }

  // Grid 2
  if (gridCount === 2) {
    if (isExpanded) {
      return isMobileDevice
        ? settings.gridTwoProductOverlayExpandedHeightMobile ?? "35%"
        : settings.gridTwoProductOverlayExpandedHeight ?? "35%";
    } else {
      return isMobileDevice
        ? settings.gridTwoProductOverlayHeightMobile ?? "15%"
        : settings.gridTwoProductOverlayHeight ?? "20%";
    }
  }

  // Grid 3
  if (gridCount === 3) {
    if (isExpanded) {
      return isMobileDevice
        ? settings.gridThreeProductOverlayExpandedHeightMobile ?? "45%"
        : settings.gridThreeProductOverlayExpandedHeight ?? "45%";
    } else {
      return isMobileDevice
        ? settings.gridThreeProductOverlayHeightMobile ?? "25%"
        : settings.gridThreeProductOverlayHeight ?? "30%";
    }
  }

  // Grid 4
  if (gridCount === 4) {
    if (isExpanded) {
      return isMobileDevice
        ? settings.gridFourProductOverlayExpandedHeightMobile ?? "45%"
        : settings.gridFourProductOverlayExpandedHeight ?? "55%";
    } else {
      return isMobileDevice
        ? settings.gridFourProductOverlayHeightMobile ?? "20%"
        : settings.gridFourProductOverlayHeight ?? "35%";
    }
  }

  // Varsayılan değerler
  return isExpanded ? "35%" : "15%";
};

