import axios from 'axios';
import { debounce } from './debounce';
import { useState } from 'react';

export const fetchCity = async (city: any) => {
  const { data } = await axios.get(`https://api.sat.ua/study/hs/api/v1.0/main/json/getTowns?searchString=${city}&rsp=10&language=ua`);
  return data;
};


export const useFetchCities = (methods: any) => {
  const [dropDown, setDropDown] = useState([]);
  const fetchUrl = async (targetCity: string) => {
    const data = await fetchCity(targetCity);
    if (data.data?.length <= 0) methods.setError('city', {
      type: 'custom',
      message: '',
    });
    else methods.clearErrors('city');
    setDropDown(data.data);
  };
  const fetching = debounce(fetchUrl, 300);
  const onClickTown = (el: string) => {
    methods.setValue('city', el);
    setDropDown([]);
  };
  return {
    dropDown, fetching, onClickTown
  }
}