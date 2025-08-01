import { Link, useTranslation } from "@ikas/storefront";
import { BlogListsProps } from "../__generated__/types";
import Button from "../components/button";
import styles from "./style.module.css";

const BlogList: React.FC<BlogListsProps> = (props: BlogListsProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.grid}>
      {props.blogs?.data.map((item) => {
        return (
          <Link href={item.href}>
            <div className="" key={item.id}>
              {item?.image && (
                <img className={styles.blogImg} src={item?.image.src} />
              )}
              <div className={styles.contentArea}>
                <div>
                  <Link href={item.href}>
                    <span className={styles.title}>{item.title}</span>
                  </Link>
                  <p className={styles.shortDescription}>
                    {item.shortDescription}
                  </p>
                </div>
                <div className={styles.readMoreBtn}>
                  <Link href={item.href}>
                    <Button size="small">
                      {t(`blog-lists:blog.readMore`)}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
