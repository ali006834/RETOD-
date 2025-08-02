import React from "react";
import { observer } from "mobx-react-lite";

import { FiltersWrapper } from "../components/filters-wrapper";

import * as S from "./style";
import { FiltersProps } from "../index";

export const BoxFilters = observer((props: FiltersProps) => {
  const { filter, lastChild } = props;

  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
    >
      <S.BoxWrapper>
        {props.filter.displayedValues
          .slice()
          .sort((a, b) => {
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
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "XXL",
              "2XL",
              "3XL",
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
          })
          .map((value) => (
            <S.Box
              key={value.id}
              $disabled={value.resultCount === 0}
              $selected={value.isSelected}
              onClick={() => {
                props.filter.onFilterValueClick(value);
              }}
            >
              {value.name}{" "}
              <span style={{ fontSize: "10px", color: "gray" }}>
                ( {value.resultCount})
              </span>
            </S.Box>
          ))}
      </S.BoxWrapper>
    </FiltersWrapper>
  );
});
