import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import { usePaginationHook } from '@/utils/usePagination';

interface props {
  pageCount: number;
  paginateRoute: string;
}

const Pagination: FC<props> = ({ pageCount, paginateRoute }) => {

  const {
    pagesValue,
    onClickPlus,
    onClickMinus,
    onClickPage,
    page,
    pages,
  } = usePaginationHook(pageCount, paginateRoute);
  return (
    <div className={styles.paginationWrapper}>
       <button onClick={onClickMinus} className={`${page <= 1 && styles.disabled}`} disabled={page <= 1}>{'<'}</button>
      {pagesValue.map((el: number, i: number) =>
        <p key={i} className={`${page === el && styles.active}`} onClick={onClickPage(el)}>
          {el}
        </p>)}
        <button onClick={onClickPlus} className={`${page == pages && styles.disabled}`} disabled={page === pages}>{'>'}</button>
    </div>
  );
};

export default Pagination;