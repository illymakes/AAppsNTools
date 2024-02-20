import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};