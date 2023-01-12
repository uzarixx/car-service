import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import { usePaginationHook } from '../../../utils/paginationHook';

interface props {
  pageCount: number;
}

const Pagination: FC<props> = ({ pageCount }) => {
  const {
    pagesValue,
    onClickPlus,
    onClickMinus,
    onClickPage,
    page,
    pages,
  } = usePaginationHook(pageCount);
  return (
    <div className={styles.paginationWrapper}>
      {page >= 2 && <button onClick={onClickMinus}>{'<'}</button>}
      {pagesValue.map((el: number, i: number) =>
        <p key={i} className={`${page === el && styles.active}`} onClick={onClickPage(el)}>
          {el}
        </p>)}
      {page !== pages && <button onClick={onClickPlus}>{'>'}</button>}
    </div>
  );
};

export default Pagination;