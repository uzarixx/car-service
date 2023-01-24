import { useState } from 'react';
import { useRouter } from 'next/router';

export const usePaginationHook = (pageCount: number, paginateRoute: string) => {
  const router = useRouter();
  const pages = Math.ceil(pageCount / 10);
  const [page, setPage] = useState(Number(router?.query?.page) || 1);
  const pagesValue: number[] = [];
  for (let i = 0; i < pages; ++i) {
    pagesValue.push(i + 1);
  }
  const pagePush = (page: number) => router.push(`/${paginateRoute}?page=${page}`);
  const onClickPage = (el: number) => async () => {
    setPage(el);
    await pagePush(el);
  };
  const onClickPlus = () => {
    page >= pages || setPage((s: number) => s + 1);
    return pagePush(page + 1);
  };
  const onClickMinus = () => {
    page >= 2 && setPage((s: number) => s - 1);
    return pagePush(page - 1);
  };
  return {
    pagesValue, onClickPlus, onClickMinus, onClickPage, page, pages,
  };
};