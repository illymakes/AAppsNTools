import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from './FavoritesContext';

const TileCard = ({ title, image, year, category, shortSummary, imageIcon, darkMode, onClick, isCondensedView }) => {
    const { favorites, isFavorited, addFav, removeFav, updateTrigger } = useContext(FavoritesContext);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const status = await isFavorited(title, category);
            setLiked(status);
        };

        checkFavoriteStatus();
    }, [title, category, isFavorited, favorites, updateTrigger]);

    const toggleLike = async (event) => {
        event.stopPropagation();
        if (liked) {
            await removeFav(title, category);
        } else {
            await addFav({ id: title, category });
        }
        setLiked(!liked);
    };

    const getCategoryStyle = (category) => {
        const colorsDarkMode = {
            books: '#FFA07A',
            movies: '#ADD8E6',
            "video games": '#c478b5',
            default: '#A9A9A9',
        };

        const colorsLightMode = {
            books: '#FF6347',
            movies: '#1E90FF',
            "video games": '#965b8a',
            default: '#696969',
        };

        const color = (darkMode ? colorsDarkMode : colorsLightMode)[category.toLowerCase()] || (darkMode ? colorsDarkMode.default : colorsLightMode.default);

        return {
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: color,
        };
    };

    if (isCondensedView) {
        return (
            <Card
                onClick={onClick}
            >
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        );

    } else {

        return (
            <Card sx={{
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
                },
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
            }} onClick={onClick} >
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '200px',
                    }}
                    image={image}
                    alt={title}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', top: '-46px', right: '8px' }}>
                    <button
                        onClick={toggleLike}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <FontAwesomeIcon
                            icon={liked ? faHeartSolid : faHeartRegular}
                            color={liked ? 'red' : 'grey'} />
                    </button>
                </div>
                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <img src={imageIcon} alt="icon" style={{ width: 60, height: 60, borderRadius: '10%' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {year}
                    </Typography>
                    <Typography variant="body2" component="div" sx={getCategoryStyle(category)}>
                        {category}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {shortSummary}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

TileCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string,
    category: PropTypes.string.isRequired,
    shortSummary: PropTypes.string.isRequired,
    darkMode: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    isCondensedView: PropTypes.bool.isRequired,
};

export default TileCard;