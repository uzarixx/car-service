import React, { FC, useEffect, useState } from 'react';
import styles from './OfferCard.module.scss';
import offersService from '@/service/offersService';
import { useRouter } from 'next/router';
import Pagination from '@components/ui/pagination/Pagination';

interface offerType {
  title: string;
  sliceDesc: string;
  city: string;
  id: number;
}

const fetchOffers = async (page: number) => {
  const { data } = await offersService.getOffers(page);
  return (
    await data
  );
};


const OfferCard: FC = () => {
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    fetchOffers(Number(router.query.page)).then((res) => {
      setOffers(res.rows);
      setPageCount(res.count);
    }).catch((e) => console.error(e));
  }, [router.query]);
  return (
    <>
      {offers.map((el: offerType) =>
        <div className={styles.offersCardWrapper} key={el.id}>
          <div className={styles.offerParams}>
            <p>{el.title}</p>
            <p>{el.sliceDesc}</p>
            <p>{el.city}</p>
          </div>
        </div>,
      )}
      <Pagination pageCount={pageCount} paginateRoute={'offers'} />
    </>
  );
};

export default OfferCard;