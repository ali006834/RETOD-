import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import styles from "./style.module.css";

import BasketIcon from "./svg/basket1";
import FavoriteIcon from "./svg/favorite1";
import PageViewIcon from "./svg/viewPage1";

// İkonlar https://www.svgrepo.com/collection/neuicons-oval-line-icons/6

// Deterministik rastgele sayı üretici (ürün ID'sine bağlı)
const generateStableRandom = (seed: string, min: number, max: number) => {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = Math.sin(hash) * 10000;
  return Math.floor((random - Math.floor(random)) * (max - min + 1) + min);
};

export const ProductStats = observer((props: ProductDetailProps) => {
  const { product } = props;
  const productId = product?.id || "default";

  const [activeIndex, setActiveIndex] = useState(0);
  const [stats, setStats] = useState(() => {
    // Ürün ID'sine göre sabit başlangıç değerleri
    return {
      favorites: generateStableRandom(productId + "favorites", 10, 30),
      basketAdds: generateStableRandom(productId + "basket", 5, 15),
      views: generateStableRandom(productId + "views", 15, 50),
      lastUpdated: new Date(),
      resetTime: getNextResetTime(),
    };
  });

  // 24 saat sonraki sıfırlanma zamanını hesapla
  function getNextResetTime() {
    const now = new Date();
    const nextReset = new Date(now);
    nextReset.setDate(nextReset.getDate() + 1);
    nextReset.setHours(0, 0, 0, 0);
    return nextReset;
  }

  // Saatlik artışları ve sıfırlamayı yönet
  useEffect(() => {
    const now = new Date();
    const timeToReset = stats.resetTime.getTime() - now.getTime();

    // 24 saatte bir sıfırlama için timer
    const resetTimer = setTimeout(() => {
      setStats({
        favorites: generateStableRandom(productId + "favorites", 10, 30),
        basketAdds: generateStableRandom(productId + "basket", 5, 15),
        views: generateStableRandom(productId + "views", 15, 50),
        lastUpdated: new Date(),
        resetTime: getNextResetTime(),
      });
    }, timeToReset);

    // Saatlik güncelleme için interval
    const updateInterval = setInterval(() => {
      setStats((prev) => {
        const now = new Date();
        const hoursSinceLastUpdate =
          (now.getTime() - prev.lastUpdated.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastUpdate >= 1) {
          // Deterministik güncellemeler
          const favoritesChange = generateStableRandom(
            productId + now.getHours() + "fc",
            -3,
            3
          );
          const basketChange = generateStableRandom(
            productId + now.getHours() + "bc",
            -1,
            1
          );
          const viewsChange = generateStableRandom(
            productId + now.getHours() + "vc",
            5,
            10
          );

          return {
            ...prev,
            favorites: Math.max(0, prev.favorites + favoritesChange),
            basketAdds: Math.max(0, prev.basketAdds + basketChange),
            views: Math.min(150, prev.views + viewsChange),
            lastUpdated: now,
          };
        }
        return prev;
      });
    }, 60 * 60 * 1000); // Her saat kontrol

    return () => {
      clearTimeout(resetTimer);
      clearInterval(updateInterval);
    };
  }, [productId, stats.resetTime]);

  const statItems = [
    {
      icon: <FavoriteIcon />,
      text: `Sevilen ürün! ${stats.favorites} kişi favoriledi!`,
    },
    {
      icon: <BasketIcon />,
      text: `${stats.basketAdds} kişinin sepetinde, tükenmeden al!`,
    },
    {
      icon: <PageViewIcon />,
      text: `Son 24 saatte ${stats.views} kişi görüntüledi!`,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [statItems.length]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderContainer}>
        {statItems.map((stat, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.active : ""
            }`}
            style={{
              transform: `translateY(${index === activeIndex ? "0%" : "100%"})`,
            }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <span className={styles.statText} data-text={stat.text}>
              {stat.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
