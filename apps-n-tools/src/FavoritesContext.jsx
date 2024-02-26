//check that the favorites are working correctly at home

import { createContext, useState, useEffect } from 'react';
import { addFavorite, removeFavorite, checkFavorite, getFavorites } from './db';
import PropTypes from 'prop-types';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await getFavorites();
            setFavorites(favs);
        };
        fetchFavorites();
    }, []);

    const addFav = async (item) => {
        if (typeof item.id === 'undefined' || item.id === item.title) {
            return;
        }
        await addFavorite(item);
        setFavorites([...favorites, item]);
        setUpdateTrigger(u => u + 1);
    };

    const removeFav = async (id, category) => {
        await removeFavorite(id, category);
        setFavorites(favorites.filter(fav => fav.id !== id || fav.category !== category));
        setUpdateTrigger(u => u + 1);
    };

    const isFavorited = async (id, category) => {
        return await checkFavorite(id, category);
    };

    const value = { favorites, addFav, removeFav, isFavorited, updateTrigger };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
}