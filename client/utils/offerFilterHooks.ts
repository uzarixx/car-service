import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



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
    Object.keys(filteredParam).forEach(key => filteredParam[key] && query.append(key, filteredParam[key]));
    router.push(`/offer${query && '?'}${query}`);
  }, [filteredParam]);

  return {
    filteredParam, setFilteredParam,
  };
};