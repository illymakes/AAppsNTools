import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from './useFavorites';

const TileCard = ({ title, image, year, category, shortSummary, darkMode, onClick }) => {
    const { addFav, removeFav, isFavorited } = useFavorites(); // Use context
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const check = async () => {
            const isLiked = await isFavorited(title, category);
            setLiked(isLiked);
        };
        check();
    }, [title, category, isFavorited]);

    const toggleLike = async () => {
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
                <button onClick={toggleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} color={liked ? 'red' : 'grey'} />
                </button>
            </div>
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
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
};

TileCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string,
    category: PropTypes.string.isRequired,
    shortSummary: PropTypes.string.isRequired,
    darkMode: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default TileCard;