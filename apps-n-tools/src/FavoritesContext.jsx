import { createContext, useState, useEffect } from 'react';
import { addFavorite, removeFavorite, checkFavorite, getFavorites } from './db';
import PropTypes from 'prop-types';

export const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await getFavorites();
            setFavorites(favs);
        };
        fetchFavorites();
    }, []);

    const addFav = async (item) => {
        await addFavorite(item);
        setFavorites([...favorites, item]);
    };

    const removeFav = async (id, category) => {
        await removeFavorite(id, category);
        setFavorites(favorites.filter(fav => fav.id !== id || fav.category !== category));
    };

    const isFavorited = async (id, category) => {
        return await checkFavorite(id, category);
    };

    const value = { favorites, addFav, removeFav, isFavorited };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
}