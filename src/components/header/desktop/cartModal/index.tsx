import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasBaseStore,
  IkasOrderLineItem,
  IkasProduct,
  IkasProductList,
  Image,
  Link,
  useStore,
  useTranslation,
} from "@ikas/storefront";
import EmptyCartModal from "./empty-cart";
import { HeaderProps } from "src/components/__generated__/types";
import * as S from "./style";
import Item from "./item";
export const NS = "common";

import Product from "src/components/product-list/product";
import Loading from "src/components/account/components/loading";
import useFavoriteProducts from "src/components/account/favorite-products/useFavoriteProducts";
import HeartWithCursorIcon from "src/components/svg/heart-with-cursor";

const CartModal = (props: HeaderProps) => {
  const { cartProducts, title } = props;

  const store = useStore();
  const { t } = useTranslation();
  const { cart } = store.cartStore;
  const isCartEmpty = !cart || !cart?.itemCount;
  const [activeTab, setActiveTab] = useState("cart");

  // Favori ürünleri yönetme
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();

  // Favorilere her ürün eklendiğinde ürünleri güncelle
  useEffect(() => {
    if (activeTab === "wishlist") {
      getFavoriteProducts();
    }
  }, [activeTab, store.customerStore.getFavoriteProducts]);

  return (
    <div>
      {isCartEmpty && <EmptyCartModal />}
      {!isCartEmpty && (
        <S.Cart>
          <S.TabsContainer>
            {/*//= Sepetim  */}
            <S.Tab
              className={activeTab === "cart" ? "active" : ""}
              onClick={() => setActiveTab("cart")}
            >
              {t(`${NS}:title`)} ({cart?.itemQuantity || 0})
            </S.Tab>
            {/*//= İstek Listesi  */}
            <S.Tab
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              {t(`${NS}:wishList.title`) + ` (${products.length})`}
            </S.Tab>
          </S.TabsContainer>

          {activeTab === "cart" && (
            <>
              <S.Section>
                <S.Main>
                  <Items />
                </S.Main>
                <Main cartProducts={cartProducts} title={title} />
              </S.Section>
              <S.CouponContainer>
                <S.CouponInput placeholder={t(`${NS}:coupon.placeholder`)} />
                <S.ApplyButton>{t(`${NS}:coupon.apply`)}</S.ApplyButton>
              </S.CouponContainer>
            </>
          )}

          {activeTab === "wishlist" && (
            <S.EmptyWishlist>
              <S.EmptyWishlistItem>
                {products.length < 1 && (
                  <>
                    <S.Span1>{t(`${NS}:wishList.empty`)}</S.Span1>
                    <S.Span2>
                      {t(`${NS}:wishList.favoriteProducts.tip`)}
                    </S.Span2>
                    <S.Span3>
                      {t(`${NS}:wishList.favoriteProducts.instructions`)}
                    </S.Span3>
                    <HeartWithCursorIcon />
                  </>
                )}
                {store.cartStore.cart?.items[0] && (
                  <MainWishList item={store.cartStore.cart.items[0]} />
                )}
              </S.EmptyWishlistItem>
            </S.EmptyWishlist>
          )}
        </S.Cart>
      )}
    </div>
  );
};

export default observer(CartModal);

//=Pop-Up Cart => Sepetim Alanı
export const Main = ({
  cartProducts,
  title,
}: {
  cartProducts?: IkasProductList;
  title?: string;
}) => {
  const { t } = useTranslation();

  return (
    <S.Main>
      <S.Title>{title}</S.Title>
      <S.ProductsGrid>
        {cartProducts?.data.map((product) => {
          const a11yTitle = product?.selectedVariant?.hasStock
            ? ""
            : t("common:product.discountBadgeSoldOut");

          return (
            <S.ProductContainer key={product.id}>
              <Link href={product?.href}>
                <a title={a11yTitle} style={{ textDecoration: "none" }}>
                  <ProductImage product={product} />
                  <S.ProductInfo>
                    <ProductTitleComponent product={product} />
                    <PriceComponent product={product} />
                  </S.ProductInfo>
                </a>
              </Link>
            </S.ProductContainer>
          );
        })}
      </S.ProductsGrid>
    </S.Main>
  );
};

//=Pop-Up Cart => Favoriler Alanı
export const MainWishList = ({ item }: { item: IkasOrderLineItem }) => {
  return (
    <div>
      <CartItemFavoriteButton item={item} />
    </div>
  );
};

//= Sepetteki ürünler
const Items = observer(() => {
  const store = useStore();

  return (
    <S.Items>
      {store.cartStore.cart?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </S.Items>
  );
});

//= Ürünler
//! Fotoğraf
const ProductImage = observer(({ product }: { product: IkasProduct }) => {
  return (
    <S.ProductImageContainer>
      {!product.selectedVariant.mainImage?.image?.id ? (
        <img src="/product-dummy-image.jpeg" alt={product.name} />
      ) : product.selectedVariant.mainImage.image.isVideo ? (
        <video src={product.selectedVariant.mainImage.image.src} />
      ) : (
        <Image
          width={460}
          height={690}
          objectFit="cover"
          useBlur={true}
          image={product.selectedVariant.mainImage?.image!}
          alt={product.selectedVariant.product?.name || undefined}
        />
      )}
    </S.ProductImageContainer>
  );
});

//! Fiyat
const PriceComponent = observer(({ product }: { product: IkasProduct }) => {
  return (
    <S.PriceContent>
      <S.Price>{product.selectedVariant.price.formattedFinalPrice}</S.Price>
      {product.selectedVariant.price.hasDiscount && (
        <S.DiscountPrice>
          {product.selectedVariant.price.formattedSellPrice}
        </S.DiscountPrice>
      )}
    </S.PriceContent>
  );
});

//! Başlık
const ProductTitleComponent = observer(
  ({ product }: { product: IkasProduct }) => (
    <S.ProductTitle>{product.name}</S.ProductTitle>
  )
);

//= Favoriler
const CartItemFavoriteButton = observer(
  ({ item }: { item: IkasOrderLineItem }) => {
    const store = useStore();
    const { t } = useTranslation();
    const { products, isPending, getFavoriteProducts } = useFavoriteProducts();

    return (
      <div>
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
  }
);

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
      <Link passHref href="/">
        <a>{t(`${NS}:wishList.favoriteProducts.browseProduct`)}</a>
      </Link>
    </S.NoProducts>
  );
};
