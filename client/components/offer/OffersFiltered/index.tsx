import React, { FC, Fragment } from 'react';
import styles from './OffersFiltered.module.scss';
import { PostNewAdCarType } from '../../../constants/selectArrays';
import SelectFiltered from '../../ui/select/selectFiltered';
import { useOfferFilter } from '../../../utils/offerFilterHooks';
import AccountSettingsInput from '../../ui/inputs/accountSettingsInput';
import Input from '../../ui/inputs/input';

const OffersFiltered: FC = () => {
  const {filterCity, filteredParam, setFilteredParam } = useOfferFilter();
  return (
    <div className={styles.filterWrapper}>
      <div>
      <h2>Авто з якими ви хочете працювати</h2>
      </div>
      <div className={styles.filterParams}>
      {PostNewAdCarType.map((el, i) =>
        <Fragment key={i}>
          <SelectFiltered
            selectArray={el}
            setFilteredParam={setFilteredParam}
            filteredParam={filteredParam} />
        </Fragment>,
      )}
      </div>
      <Input filterCity={filterCity}/>
    </div>
  );
};

export default OffersFiltered;