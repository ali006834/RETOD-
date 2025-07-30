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
            const order = [
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
            const aIndex = order.indexOf(a.name);
            const bIndex = order.indexOf(b.name);
            if (aIndex === -1 && bIndex === -1)
              return a.name.localeCompare(b.name);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
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
