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
  const { title, image, instagramMediaLimit, access_token } = props;

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

      try {
        setLoading(true);
        setError(null);

        // Instagram kullanıcı bilgilerini çek
        const userInfoUrl = `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${access_token}`;
        const userInfoResponse = await axios.get<InstagramUser>(userInfoUrl);
        setUserInfo(userInfoResponse.data);

        // Instagram profil resmini çek (username ile)
        if (userInfoResponse.data.username) {
          try {
            // Instagram Basic Display API'de profil resmi direkt yok, 
            // ama media'dan ilk post'un resmini veya fallback olarak props'tan gelen image'ı kullanabiliriz
            setProfileImageUrl(null);
          } catch (err) {
            // Profil resmi alınamazsa props'tan gelen image kullanılacak
          }
        }

        // Instagram post'larını çek (beğeni ve yorum sayısı dahil, carousel için children dahil)
        const generalInfoUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,caption,like_count,comments_count,children{media_type,media_url}&access_token=${access_token}&limit=${instagramMediaLimit?.value || 15}`;
        const generalInfoResponse = await axios.get(generalInfoUrl);
        const postsData = generalInfoResponse.data.data || [];

        // Her bir post için detayları al (eğer caption, like_count veya comments_count eksikse)
        const detailedData: InstagramPost[] = await Promise.all(
          postsData.map(async (post: any) => {
            // Carousel postlar için ilk child'ın media_url'ini kullan
            if (post.media_type === "CAROUSEL_ALBUM" && post.children?.data?.length > 0) {
              const firstImageChild = post.children.data.find((child: any) => child.media_type === "IMAGE");
              if (firstImageChild) {
                post.media_url = firstImageChild.media_url;
              }
            }
            
            // Eğer tüm bilgiler varsa direkt kullan
            if (post.caption !== undefined && post.like_count !== undefined && post.comments_count !== undefined) {
              return post;
            }
            
            // Eksik bilgiler varsa detay isteği yap
            try {
              const postDetailUrl = `https://graph.instagram.com/${post.id}?fields=id,timestamp,caption,like_count,comments_count&access_token=${access_token}`;
              const detailResponse = await axios.get(postDetailUrl);
              return { 
                ...post, 
                ...detailResponse.data,
                // Eğer API'den gelmediyse mevcut değerleri koru
                like_count: detailResponse.data.like_count ?? post.like_count ?? 0,
                comments_count: detailResponse.data.comments_count ?? post.comments_count ?? 0
              };
            } catch (err) {
              // Detay alınamazsa mevcut post'u döndür
              return {
                ...post,
                like_count: post.like_count ?? 0,
                comments_count: post.comments_count ?? 0
              };
            }
          })
        );

        setDetailedPosts(detailedData);
      } catch (error: any) {
        console.error("Error fetching Instagram data:", error);
        setError(error?.response?.data?.error?.message || "Veri çekilirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [access_token]);



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
                slidesPerView: 4.2,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 6.2,
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
