import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Swatch } from "src/components/components/swatch";
import { FiltersProps } from "../index/index";
import { FiltersWrapper } from "../components/filters-wrapper";

const StyledSwatchFilters = styled.div``;

export const SwatchFilters = observer(({ filter, lastChild }: FiltersProps) => {
  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper
      title={filter.name}
      noBorder={lastChild}
      settings={filter.settings}
    >
      <StyledSwatchFilters>
        {filter.displayedValues.map((dV) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "#f3f4f6",
              paddingLeft: "10px",
            }}
          >
            <Swatch
              key={dV.id}
              title={dV.name}
              selected={dV.isSelected}
              colorCode={dV.colorCode}
              image={dV.thumbnailImage}
              onClick={() => {
                filter.onFilterValueClick(dV);
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "gray",
                fontFamily: "Manrope Medium",
              }}
            >
              ({dV.resultCount})
            </span>
          </div>
        ))}
      </StyledSwatchFilters>
    </FiltersWrapper>
  );
});
