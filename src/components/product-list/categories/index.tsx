import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import { FiltersWrapper } from "../filter/components/filters-wrapper";
import { FilterCheckbox } from "../filter/components/filter-checkbox";

type CategoriesProps = {
  productList?: IkasProductList;
};

export const Categories = observer(({ productList }: CategoriesProps) => {
  if (!productList) {
    return null;
  }
  const { t } = useTranslation();

  if (!productList.filterCategories?.length) return null;

  return (
    <FiltersWrapper title={t("productList.categories")} defaultOpen={true}>
      <div>
        {productList.filterCategories.map((filterCategory) => (
          <FilterCheckbox
            key={filterCategory.id}
            checked={filterCategory.isSelected}
            label={filterCategory.name}
            resultCount={filterCategory.resultCount || 0}
            onChange={() =>
              productList.onFilterCategoryClick(filterCategory, true)
            }
          />
        ))}
      </div>
    </FiltersWrapper>
  );
});
