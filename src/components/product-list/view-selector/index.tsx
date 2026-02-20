import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

type ViewSelectorProps = {
  columns: number;
  onChange: (columns: number) => void;
};

type ViewMode = {
  mobile: number[];
  tablet: number[];
  desktop: number[];
};

// Hangi medya tipinde kaç ürün/sütun gösterileceği
const VIEW_MODES: ViewMode = {
  mobile: [1, 2, 4], // Örneğin.. ==> Range ayarı: %0 => 1 ürün, %50 => 2 ürün, %100 => 4 ürün
  tablet: [2, 5],
  desktop: [2, 4, 6],
};

const ViewSelector: React.FC<ViewSelectorProps> = ({ columns, onChange }) => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1025
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDeviceType = () => {
    if (screenWidth < 768) return "mobile";
    if (screenWidth >= 768 && screenWidth <= 1024) return "tablet";
    return "desktop";
  };

  const deviceType = getDeviceType();
  const availableColumns = VIEW_MODES[deviceType];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const columnIndex = Math.round(
      value / (100 / (availableColumns.length - 1))
    );
    onChange(availableColumns[columnIndex]);
  };

  const getSliderValue = () => {
    const currentIndex = availableColumns.indexOf(columns);
    return currentIndex >= 0
      ? currentIndex * (100 / (availableColumns.length - 1))
      : 0;
  };

  return (
    <div className={styles.view_selector}>
      <input
        type="range"
        min="0"
        max="100"
        step={availableColumns.length > 2 ? 50 : 100}
        value={getSliderValue()}
        onChange={handleChange}
        className={styles.view_selector_slider}
      />
    </div>
  );
};

export default ViewSelector;
