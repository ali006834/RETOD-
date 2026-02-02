import React, { useState, useEffect, useRef, useCallback } from "react";
import Favorite from "src/components/svg/favorite";

interface Heart {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  color: string;
  baseSize: number;
}

const HeartTrails: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const heartIdRef = useRef(0);
  const lastHeartTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const throttleDelay = 30; // 30ms throttle (daha sık kalp eklemek için)

  const redColors = [
    "#731817", // Koyu aşk kırmızısı
  ];

  const addHeart = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastHeartTimeRef.current < throttleDelay) {
      return;
    }
    lastHeartTimeRef.current = now;

    // Mouse hareket yönünü hesapla.. rotate için
    const dx = x - lastMousePosRef.current.x;
    const dy = y - lastMousePosRef.current.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    lastMousePosRef.current = { x, y };

    // Rastgele renk, boyut ve başlangıç rotasyonu
    const randomColor = redColors[Math.floor(Math.random() * redColors.length)];
    const randomBaseSize = 24 + Math.random() * 12; // 24-36px arası
    const randomRotation = angle + (Math.random() * 30 - 15); // Mouse yönüne göre ±15 derece varyasyon

    const newHeart: Heart = {
      id: heartIdRef.current++,
      x,
      y,
      opacity: 1,
      scale: 0.4 + Math.random() * 0.2, // 0.4-0.6 arası başlangıç
      rotation: randomRotation,
      color: randomColor,
      baseSize: randomBaseSize,
    };

    setHearts((prev) => [...prev, newHeart]);

    // Kalbi 2 saniye sonra kaldır
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, 2000);
  }, []);

  // Mouse pozisyonunu takip et
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Rastgele kalp ekleme şansı (%75) - yoğunluk artırıldı
      if (Math.random() > 0.25) {
        addHeart(e.clientX, e.clientY);
        // Bazen 2 kalp birden ekle (daha yoğun trail)
        if (Math.random() > 0.5) {
          setTimeout(() => {
            addHeart(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5));
          }, 10);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [addHeart]);

  // Kalpleri animasyonlu olarak güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((heart) => ({
            ...heart,
            opacity: Math.max(0, heart.opacity - 0.015),
            scale: Math.min(1.3, heart.scale + 0.012),
            rotation: heart.rotation + 2, // Sürekli döndürme
            y: heart.y - 0.8,
          }))
          .filter((heart) => heart.opacity > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: `translate(-50%, -50%) scale(${heart.scale}) rotate(${heart.rotation}deg)`,
            opacity: heart.opacity,
            transition: "none",
          }}
        >
          <Favorite
            width={heart.baseSize.toString()}
            height={heart.baseSize.toString()}
            color={heart.color}
            fill={true}
          />
        </div>
      ))}
    </div>
  );
};

export default HeartTrails;

