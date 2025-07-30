import React from "react";
import { observer } from "mobx-react-lite";
import {
  Link,
  useTranslation,
  IkasProduct,
  useStore,
  IkasBaseStore,
} from "@ikas/storefront";

import Product from "src/components/product-list/product";
import Header from "src/components/account/components/header";
import Loading from "src/components/account/components/loading";
import useFavoriteProducts from "./useFavoriteProducts";

import { NS } from "src/components/account";

import * as S from "./style";

const FavoriteProducts = () => {
  const store = useStore();
  const { t } = useTranslation();
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();

  const headerTitle =
    t(`${NS}:favoriteProducts.title`) + ` (${products.length})`;

  return (
    <div>
      <Header title={headerTitle} />
      {isPending && <Loading>{t(`${NS}:loading`)}</Loading>}
      {!isPending && products.length === 0 && <NoProducts />}
      {!isPending && !!products.length && (
        <Products
          products={products}
          store={store}
          getFavoriteProducts={getFavoriteProducts}
        />
      )}
    </div>
  );
};

export default observer(FavoriteProducts);

type ProductsProps = {
  products: IkasProduct[];
  store: IkasBaseStore;
  getFavoriteProducts: () => void;
};

const Products = observer(
  ({ store, products, getFavoriteProducts }: ProductsProps) => {
    return (
      <S.Products>
        {products.map((product, index) => {
          const onClick = async () => {
            await store.customerStore.removeProductFromFavorites(product.id);
            getFavoriteProducts();
          };

          return (
            <S.ProductWrapper key={product.id + index}>
              {/* //ürünler  */}
              <Product product={product} />
            </S.ProductWrapper>
          );
        })}
      </S.Products>
    );
  }
);

const NoProducts = () => {
  const { t } = useTranslation();
  return (
    <S.NoProducts>
      <S.NoProductsTitle className="text-xl mb-4">
        {t(`${NS}:favoriteProducts.noFavoriteProduct`)}
      </S.NoProductsTitle>
      <Link passHref href="/">
        <a>{t(`${NS}:favoriteProducts.browseProduct`)}</a>
      </Link>
    </S.NoProducts>
  );
};
