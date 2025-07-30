import React from "react";
import { useTranslation } from "@ikas/storefront";

import * as S from "./style";

type Props = {
  hasPrev: boolean;
  hasNext: boolean;
  loading: boolean;
  count: number;
  page: number;
  pageCount: number;
  getPage: (page: number) => Promise<void>;
};

const Pagination = (props: Props) => {
  const { t } = useTranslation();
  const { loading, count, page, pageCount } = props;

  const getPage = async (page: number) => {
    if (loading) return;
    await props.getPage(page);
  };

  const onPageClick = (pageNumber: number) => {
    if (loading || page === pageNumber) return;
    getPage(pageNumber);
  };

  if (!count) return null;

  const createPageNumbers = () => {
    const pages = new Set<number | string>();
  
    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        pages.add(i);
      }
    } else {
      pages.add(1);
  
      if (page === 1) {
        pages.add(2);
        pages.add(3);
        pages.add("...");
      } else if (page === pageCount) {
        pages.add("...");
        pages.add(pageCount - 2);
        pages.add(pageCount - 1);
      } else {
        if (page > 3) pages.add("...");
        if (page > 2) pages.add(page - 1);
        pages.add(page);
        if (page < pageCount - 1) pages.add(page + 1);
        if (page < pageCount - 2) pages.add("...");
      }
  
      pages.add(pageCount);
    }
  
    return Array.from(pages);
  };
  

  const pages = createPageNumbers();

  return (
    <S.PaginationWrapper>
      {pages.map((pageNumber, index) => (
        <S.PageNumberButton
          key={index}
          active={pageNumber === page}
          onClick={() => {
            if (typeof pageNumber === "number") {
              onPageClick(pageNumber);
            }
          }}
          disabled={loading || pageNumber === '...'}
        >
          {pageNumber}
        </S.PageNumberButton>
      ))}
    </S.PaginationWrapper>
  );
};

export default Pagination;
