import React, { FC } from 'react';
import styles from './SelectFiltered.module.scss';

interface props {
  selectArray: { title: string; name: string; options: { title: string }[] };
  setFilteredParam: any;
  filteredParam: any;
}

const SelectFiltered: FC<props> = ({ selectArray, setFilteredParam, filteredParam }) => {
  return (
    <div className={styles.selectWrapper}>
      <select
        defaultValue={filteredParam[selectArray.name]}
      onChange={(e) => setFilteredParam({...filteredParam, [selectArray.name]:e.target.value })}
      >
        {selectArray.options.map((el, i) =>
          <option key={i} value={el.title === '' ? '' : el.title}>
            {el.title === '' ? selectArray.title : el.title}
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectFiltered;