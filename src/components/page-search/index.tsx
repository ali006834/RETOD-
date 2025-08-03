import React from "react";
import { observer } from "mobx-react-lite";

import ProductList from "../product-list";
import { PageSearchProps } from "../__generated__/types";

const PageSearch = (props: PageSearchProps) => {
  return <ProductList productList={props.productList} />;
};

export default observer(PageSearch);
