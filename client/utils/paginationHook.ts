import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const usePaginationHook = (pageCount: number, paginateRoute: string, ignoreRoutes?: boolean) => {
  const router = useRouter();
  const pages = Math.ceil(pageCount / 10);
  const [page, setPage] = useState(Number(router.query.page));
  const pagesValue: number[] = [];
  for (let i = 0; i < pages; ++i) {
    pagesValue.push(i + 1);
  }
  const query = new URLSearchParams();
  useEffect(() => {
    const params: any = { ...router.query, page: page };
    Object.keys(params).forEach(key => query.append(key, params[key]));
    router.push(`/${paginateRoute}?${query}`);
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  ignoreRoutes || useEffect(() => {
    setPage(1);
  }, [
    router.query.carType,
    router.query.carTransmission,
    router.query.carGas,
    router.query.carDrive,
    router.query.city,
  ]);
  const onClickPage = (el: number) => () => {
    setPage(el);
  };
  const onClickPlus = () => {
    page >= pages || setPage((s: number) => s + 1);
  };
  const onClickMinus = () => {
    page >= 2 && setPage((s: number) => s - 1);
  };

  return {
    pagesValue, onClickPlus, onClickMinus, onClickPage, page, pages,
  };
};