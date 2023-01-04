import React, { FC } from 'react';
import styles from './DeleteAlert.module.scss';
import ButtonGreen from '../../buttons/buttonGreen';

interface props {
  active: boolean;
  title: string;
  fetchData?: () => void;
  id: number;
  service: any;
  setActive: (arg: boolean) => void;
}

const DeleteAlert: FC<props> = ({ active, setActive, id, service, fetchData, title }) => {
  const onCloseAlert = () => {
    setActive(false);

  };
  const onDeleteOffer = async () => {
    await service(id);
    fetchData && fetchData()
  };

  return (
    <div
      className={`${styles.deleteOfferAlert} ${active ? styles.active : ''}`}
      onClick={onCloseAlert}>
      <div className={styles.alertBlock}>
        <p>{title}</p>
        <div className={styles.buttons}>
          <ButtonGreen onClick={onDeleteOffer}>Так</ButtonGreen>
          <ButtonGreen>Ні</ButtonGreen>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;