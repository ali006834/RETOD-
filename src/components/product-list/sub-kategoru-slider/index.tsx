import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { observer } from "mobx-react-lite";
import { IkasCategory } from "@ikas/storefront";

type SubcategorySliderProps = {
  subcategories: IkasCategory[];
};

const SubcategorySlider = observer(
  ({ subcategories }: SubcategorySliderProps) => {
    if (!subcategories?.length) return null;

    return (
      <div className={styles.subcategorySliderContainer}>
        <div className={styles.subcategorySlider}>
          {subcategories.map((subcategory) => (
            <Link key={subcategory.id} href={subcategory.href || "#"} passHref>
              <div className={styles.subcategoryItem}>
                <div className={styles.subcategoryImageWrapper}>
                  {subcategory.image && (
                    <img
                      src={subcategory.image.src}
                      alt={subcategory.name}
                      className={styles.subcategoryImage}
                    />
                  )}
                </div>
                <div className={styles.subcategoryName}>{subcategory.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

export default SubcategorySlider;
