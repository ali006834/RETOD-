import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Link, useTranslation } from "@ikas/storefront";
import styles from "./style.module.css";
import { InstagramPostsProps } from "../__generated__/types";
import { observer } from "mobx-react-lite";

const InstagramPosts: React.FC<InstagramPostsProps> = (props: any) => {
  const { title, image, posts, followers, access_token } = props;

  const { t } = useTranslation();

  const [Posts, setPosts] = useState([]);
  const [detailedPosts, setDetailedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Instagram Basic Display API'den veri çekmek için gereken kimlik bilgilerini ve diğer ayarları burada kullanın

        // Instagram Basic Display API'den genel bilgileri al
        const generalInfoUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${access_token}&limit=25`;
        const generalInfoResponse = await axios.get(generalInfoUrl);
        const postsData = generalInfoResponse.data.data;

        // Her bir post için ayrı bir istek yaparak detayları al
        const detailedData: any = await Promise.all(
          postsData.map(async (post: any) => {
            const postId = post.id;
            const postDetailUrl = `https://graph.instagram.com/${postId}?fields=id,timestamp,caption&access_token=${access_token}`;
            const detailResponse = await axios.get(postDetailUrl);
            return { ...post, ...detailResponse.data };
          })
        );

        setPosts(postsData);
        setDetailedPosts(detailedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: any) => {
    const options: any = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "tr-TR",
      options
    );
    return formattedDate;
  };

  const instagramPostImages = detailedPosts?.filter(
    (item: any) => item?.media_type === "IMAGE"
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrapper}>
        <h4>Instagram</h4>
        <div className={styles.title_container}>
          <div>
            <Link href="https://www.instagram.com/exumasports/">
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  image={image}
                  alt={image?.altText || ""}
                  width={110}
                  height={110}
                  objectFit="cover"
                  useBlur={true}
                />
              </a>
            </Link>
          </div>
          <div>
            <div>
              <Link href="https://www.instagram.com/exumasports/">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.title}
                >
                  {title}
                </a>
              </Link>
            </div>
            <div className={styles.post_numbers}>
              <span>
                <b>{posts}</b> {t(`common:instagram.post`)}
              </span>
              <span>
                <b>{followers}</b> {t(`common:instagram.follower`)}
              </span>
            </div>
            <div className={styles.button}>
              <Link href="https://www.instagram.com/exumasports/">
                <a target="_blank" rel="noopener noreferrer">
                  {t(`common:instagram.button`)}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {instagramPostImages?.map((item: any, index) => {
          if (index < 9) {
            return (
              <div key={index}>
                <div className={styles.instagramPost}>
                  <Link href={item.permalink}>
                    <a target="_blank" rel="noopener noreferrer">
                      <img src={item.media_url} alt="Instagram Post" />
                    </a>
                  </Link>

                  <div className={styles.post_content}>
                    <Link href={item.permalink}>
                      <a target="_blank" rel="noopener noreferrer">
                        {item?.caption?.substring(0, 60)}...
                        <span className={styles.timeStamp}>
                          {formatDate(item.timestamp)}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default observer(InstagramPosts);
