import { useEffect, useState } from 'react';
import favoriteService from '../service/favoriteService';

const fetchFavorites = async () => {
  const { data } = await favoriteService.getFavoriteId();
  return data;
};

export const useFavorite = () => {
  const [favorite, setFavorite] = useState<number[]>([]);
  useEffect(() => {
    fetchFavorites().then(e => setFavorite(e)).catch(e => console.log(e));
  }, []);
  const onAddFavorite = async (id: number) => {
    setFavorite(favorite.filter((el) => el !== id).concat(id));
    await favoriteService.createFavorite(id);
  };
  const onDeleteFavorite = async (id: number) => {
    setFavorite(favorite.filter((el) => el !== id));
    await favoriteService.deleteFavorite(id);
  };

  return {
    onAddFavorite,
    onDeleteFavorite,
    favorite
  }
}