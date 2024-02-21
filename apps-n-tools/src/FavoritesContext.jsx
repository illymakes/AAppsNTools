import { createContext, useState, useEffect } from 'react';
import { getFavorites } from './db';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await getFavorites();
            setFavorites(favs);
        };
        fetchFavorites();
    }, []);

    const value = { favorites, setFavorites };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};