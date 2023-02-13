import React, { FC, useEffect, useState } from 'react';
import styles from './AccountOffers.module.scss';
import offerService from '@/service/offerService';
import date from '@/utils/date';
import ButtonLinkGreen
  from '@/components/ui/buttons/buttonLinks/ButtonLinkGreen';
import PreloaderDots from '@/components/ui/preloaders/PreloaderDots';
import DeletePortfolioImage
  from '@/components/ui/alerts/deleteAlert/DeleteAlert';
import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import Pagination from '@/components/ui/pagination/Pagination';
import { useRouter } from 'next/router';

interface offerType {
  title: string;
  id: number;
  description: string;
  createdAt: string;
}


const AccountOffers: FC = () => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [alertActive, setAlertActive] = useState(false);
  const [offerId, setOfferId] = useState(0);
  const [offers, setOffers] = useState([]);
  const fetchOffers = async () => {
    const { data } = await offerService.getOffers(Number(router.query.page));
    setOffers(data.rows);
    setPageCount(data.count);
    await setIsLoading(false);
  };
  useEffect(() => {
    fetchOffers()
  }, [router.query.page]);
  const onDeleteOffer = (id: number) => {
    setOfferId(id);
    setAlertActive(true);
  };

  return (
    <div className={styles.accountSettingsWrapper}>
      <h2>Мої оголошення</h2>
      {isLoading && <PreloaderDots />}
      {offers.length <= 0 && <h4>Поки що тут пусто</h4>}
      <div className={styles.offersWrapper}>
        {offers.map((el: offerType, i: number) =>
          <div key={i} className={styles.offerBlock}>
            <h3>{el.title}</h3>
            <DeletePortfolioImage
              active={alertActive}
              title={'Видалити це оголошення?'}
              setActive={setAlertActive}
              fetchData={fetchOffers}
              id={offerId}
              service={offerService.deleteOffer}
            />
            <button className={styles.deleteButton}
                    onClick={() => onDeleteOffer(el.id)}><DeleteIcon /></button>
            <span>{el.description}</span>
            <div className={styles.offerFooter}>
              <p>{date(el.createdAt)}</p>
              <ButtonLinkGreen
                href={`/offer/${el.id}`}>Показати</ButtonLinkGreen>
            </div>
          </div>,
        )}
        <Pagination ignoreRoutes pageCount={pageCount} paginateRoute={'account/offers'} />
      </div>
    </div>
  );
};

export default AccountOffers;