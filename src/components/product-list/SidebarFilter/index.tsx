import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { ProductListProps } from "src/components/__generated__/types";
import { useTranslation } from "@ikas/storefront";
import styles from "./style.module.css";
import { Filter } from "../filter/index";
import { Categories } from "../categories";
import { FiltersMainTitle } from "../filter/components/filters-main-title";

const SidebarFilter = (props: ProductListProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.sidebar_filter}>
      <div className={styles.sidebar_header}>
        <h3>{t("common:list.filters.sort.text")}</h3>
        <FiltersMainTitle {...props} />
      </div>

      <div className={styles.sidebar_content}>
        <Categories {...props} />
        <Filter {...props} />
      </div>
    </div>
  );
};

export default observer(SidebarFilter);
