import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { debounce } from './debounce';



export const useOfferFilter = () => {
  const router = useRouter();
  const query = new URLSearchParams();
  const [filteredParam, setFilteredParam] = useState<any>({
    carType: router.query.carType,
    carTransmission: router.query.carTransmission,
    carGas: router.query.carGas,
    carDrive: router.query.carDrive,
    city: router.query.city,
    page: router.query.page
  });
  useEffect(() => {
    filteredParam.page >= 2 && query.append('page', '1')
    Object.keys(filteredParam).forEach(key => filteredParam[key] && query.append(key, filteredParam[key]));
    router.push(`/offer?${query}`);
  }, [filteredParam]);

  const callFilter = (city: string) => {
    setFilteredParam({...filteredParam, city: city})
  }

  const filterCity = debounce(callFilter, 300);

  return {
    filteredParam, setFilteredParam, filterCity
  };
};