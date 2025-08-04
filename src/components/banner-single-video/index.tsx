import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./style.module.css";
import { BannerSingleVideoProps } from "../__generated__/types";
import { useScreen } from "src/utils/hooks/useScreen";

const BannerSingleVideo = (props: BannerSingleVideoProps) => {
  const { videoWeb, videoMobile } = props;

  const { isMobile } = useScreen();

  if (!videoWeb || !videoMobile) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          {isMobile ? (
            <video
              className={styles.bannerVideo}
              autoPlay={videoMobile?.autoplay}
              muted={videoMobile?.muted}
              loop={videoMobile?.loop}
              playsInline
            >
              <source src={videoMobile?.videoSrc || ""} type="video/mp4" />
            </video>
          ) : (
            <video
              className={styles.bannerVideo}
              autoPlay={videoMobile?.autoplay}
              muted={videoMobile?.muted}
              loop={videoMobile?.loop}
              playsInline
            >
              <source src={videoWeb?.videoSrc || ""} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(BannerSingleVideo);
