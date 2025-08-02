import React from "react";
import { observer } from "mobx-react-lite";

import { FiltersWrapper } from "../components/filters-wrapper";
import { FilterCheckbox } from "../components/filter-checkbox";
import { FiltersProps } from "../index/index";

export const ListFilters = observer(({ filter, lastChild }: FiltersProps) => {
  if (!filter.displayedValues || !filter.displayedValues.length) return null;

  // Seçili değerlerin isimlerini al
  const selectedValues = filter.displayedValues
    .filter((value) => value.isSelected)
    .map((value) => value.name);

  // Sıralama fonksiyonu
  const sortValues = (values: any[]) => {
    return values.slice().sort((a, b) => {
      const aName = a.name.toString();
      const bName = b.name.toString();

      // Numara kontrolü
      const aIsNumber = /^\d+$/.test(aName);
      const bIsNumber = /^\d+$/.test(bName);

      // Her ikisi de numaraysa sayısal sıralama
      if (aIsNumber && bIsNumber) {
        return parseInt(aName) - parseInt(bName);
      }

      // Biri numara biri değilse, numara önce gelir
      if (aIsNumber && !bIsNumber) return -1;
      if (!aIsNumber && bIsNumber) return 1;

      // Beden sıralaması (harfli)
      const sizeOrder = [
        "XXS",
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "XXL",
        "3XL",
        "XXXL",
        "4XL",
      ];
      const aIndex = sizeOrder.indexOf(aName.toUpperCase());
      const bIndex = sizeOrder.indexOf(bName.toUpperCase());

      // Her ikisi de beden listesindeyse
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      // Biri beden listesinde biri değilse
      if (aIndex !== -1 && bIndex === -1) return -1;
      if (aIndex === -1 && bIndex !== -1) return 1;

      // Her ikisi de beden listesinde değilse alfabetik sıralama
      return aName.localeCompare(bName, "tr-TR");
    });
  };

  const sortedValues = sortValues(filter.displayedValues);

  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
      selectedValues={selectedValues}
    >
      {sortedValues.map((value) => (
        <FilterCheckbox
          key={value.id}
          checked={value.isSelected}
          onChange={() => filter.onFilterValueClick(value)}
          label={value.name}
          resultCount={value.resultCount ?? 0}
          radioStyle={false}
          colorCode={value.colorCode || undefined}
        />
      ))}
    </FiltersWrapper>
  );
});
