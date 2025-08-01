import { Link, useTranslation } from "@ikas/storefront";
import { BlogDetailProps, BlogListsProps } from "../__generated__/types";
import styles from "./style.module.css";

const BlogList: React.FC<BlogDetailProps> = (props: BlogDetailProps) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* <img className={styles.mainImage} src={props.blog?.image?.src} /> */}
      <h1 className={styles.blogTitle}>{props.blog?.title}</h1>
      <div
        className={styles.blogContent}
        dangerouslySetInnerHTML={{
          __html: props.blog?.blogContent.content as string,
        }}
      ></div>
    </div>
  );
};

export default BlogList;
