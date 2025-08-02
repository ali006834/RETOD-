import React from "react";
import { observer } from "mobx-react-lite";

import { FiltersWrapper } from "../components/filters-wrapper";
import { FilterCheckbox } from "../components/filter-checkbox";
import { FiltersProps } from "../index/index";

export const ListFilters = observer(({ filter, lastChild }: FiltersProps) => {
  if (!filter.displayedValues || !filter.displayedValues.length) return null;

  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
    >
      {filter.displayedValues.map((value) => (
        <FilterCheckbox
          key={value.id}
          checked={value.isSelected}
          onChange={() => filter.onFilterValueClick(value)}
          label={value.name}
          resultCount={value.resultCount ?? 0}
          radioStyle={true}
        />
      ))}
    </FiltersWrapper>
  );
});
