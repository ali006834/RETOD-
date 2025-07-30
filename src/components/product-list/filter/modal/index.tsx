import React, { useState, useEffect } from "react";
import { Filter } from "../index";
import { observer } from "mobx-react-lite";
import { ProductListProps } from "src/components/__generated__/types";
import { useTranslation } from "@ikas/storefront";
import styles from "./style.module.css";
import FilterSvg from "src/components/svg/pyramide";
import CloseSvg from "../../../svg/close";
import { Categories } from "../../categories";
import { FiltersMainTitle } from "../components/filters-main-title";

const ModalFilter = (props: ProductListProps) => {
  const { t } = useTranslation();

  const [showModal, setshowModal] = useState<boolean>(false);

  return (
    <div>
      <div className={styles.sort_text} onClick={() => setshowModal(true)}>
        {t("common:list.filters.sort.text")}
        <FilterSvg />
      </div>
      {showModal && (
        <div className={styles.modal_filter}>
          <div className={styles.modal_filter_content}>
            <div>
              <div className={styles.close} onClick={() => setshowModal(false)}>
                <CloseSvg />
              </div>
              <div className={styles.modal_sort_text}>
                {t("common:list.filters.sort.text")}
                <FiltersMainTitle {...props} />
              </div>
              <Categories {...props} />
              <Filter {...props} />
            </div>

            <div className={styles.confirm_wrapper}>
              <div
                className={styles.confirm}
                onClick={() => setshowModal(false)}
              >
                {t("common:list.filters.sort.confirm")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ModalFilter);
