import React, { FC, useEffect, useState } from 'react';
import styles from './ButtonCarBrands.module.scss'
import AllCarsPanel from '../../allCarsPanel';

interface props {
  error: any;
  methods: any;
}
const ButtonCarBrands: FC<props> = ({error, methods}) => {
  const [carsBrandsOpen, setCarsBrandsOpen] = useState(false);
  const [carSelect, setCarSelect] = useState('');
  useEffect(() => {
    methods.setValue('carBrand', carSelect);
    methods.clearErrors('carBrand')
  }, [carSelect, methods]);
  return (
    <div className={styles.carWrapper}>
      {carsBrandsOpen &&
        <AllCarsPanel setClose={setCarsBrandsOpen} setCar={setCarSelect} />}
      <div className={`${styles.car}  ${error.carBrand && styles.active}`} onClick={() => setCarsBrandsOpen(true)}>
        {carSelect ? carSelect : 'Оберіть марку авто'}
      </div>
      {error.carBrand && <span>{error.carBrand.message}</span>}
    </div>
  )
}

export default ButtonCarBrands