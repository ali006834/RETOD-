import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Link, useTranslation } from "@ikas/storefront";
import styles from "./style.module.css";
import { InstagramPostsProps } from "../__generated__/types";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface InstagramUser {
  id: string;
  username: string;
  account_type?: string;
}

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp?: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
  children?: {
    data: Array<{
      id: string;
      media_type: string;
      media_url: string;
    }>;
  };
}

const InstagramPosts: React.FC<InstagramPostsProps> = (props: any) => {
  const { title, image, instagramMediaLimit, access_token, showPostCaption } = props;

  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState<InstagramUser | null>(null);
  const [detailedPosts, setDetailedPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!access_token) {
        setError("Access token bulunamadı");
        setLoading(false);
        return;
      }

      const proxyUrl = process.env.NEXT_PUBLIC_INSTAGRAM_PROXY_URL;
      if (!proxyUrl) {
        setError(
          "Instagram proxy yapılandırılmamış. Lütfen NEXT_PUBLIC_INSTAGRAM_PROXY_URL ortam değişkenini ayarlayın."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const limit = String(instagramMediaLimit?.value || 15);
        const apiUrl = `${proxyUrl.replace(/\/$/, "")}/api/instagram?access_token=${encodeURIComponent(access_token)}&limit=${limit}`;
        const response = await axios.get<{
          userInfo: InstagramUser;
          posts: InstagramPost[];
        }>(apiUrl);

        setUserInfo(response.data.userInfo);
        setDetailedPosts(response.data.posts);
      } catch (error: any) {
        const errData = error?.response?.data;
        const errorMessage =
          (typeof errData?.error === "string"
            ? errData.error
            : errData?.error?.message) ||
          (error?.response?.status === 401 &&
            "Access token geçersiz veya süresi dolmuş") ||
          error?.message ||
          "Veri çekilirken bir hata oluştu";

        setError(
          typeof errorMessage === "string" ? errorMessage : "Veri çekilirken bir hata oluştu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [access_token, instagramMediaLimit?.value]);



  const instagramPostImages = detailedPosts?.filter(
    (item: InstagramPost) => item?.media_type === "IMAGE" || item?.media_type === "CAROUSEL_ALBUM"
  );


  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrapper}>
        <h4 className={styles.section_title}>{title}</h4>
      </div>
      <div className={styles.container}>
        {instagramPostImages?.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            navigation={true}
            slidesPerView={2.2}
            spaceBetween={8}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
            }}
            className={styles.swiper}
          >
            {instagramPostImages.map((item: InstagramPost, index: number) => (
              <SwiperSlide key={item.id || index} className={styles.slide}>
                <div className={styles.post_wrapper}>
                  <div className={styles.instagramPost}>
                    <Link href={item.permalink}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.post_link}
                      >
                        <div className={styles.image_container}>
                          <img
                            src={item.media_url}
                            alt={item.caption?.substring(0, 50) || "Instagram Post"}
                            className={styles.post_image}
                            loading="lazy"
                          />
                          <div className={styles.overlay}>
                            <svg
                              className={styles.instagram_icon}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </Link>
                    {showPostCaption && item.caption && (
                      <p className={styles.post_caption}>{item.caption}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.empty_state}>
            <p>Henüz gönderi bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(InstagramPosts);
