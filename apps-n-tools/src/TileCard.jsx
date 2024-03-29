import { useState, useEffect, useContext, useRef } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from './FavoritesContext';

const adjustFontSizeToFit = (element, maxHeight) => {
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);
    while (element.offsetHeight > maxHeight && fontSize > 22) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
    }
};

const TileCard = ({ title, image, year, category, shortSummary, imageIcon, darkMode, onClick, isCondensedView }) => {
    const { favorites, isFavorited, addFav, removeFav, updateTrigger } = useContext(FavoritesContext);
    const [liked, setLiked] = useState(false);
    const titleRef = useRef(null);
    const titleRefCondensed = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            const maxHeight = 60;
            adjustFontSizeToFit(titleRef.current, maxHeight);
        }
    }, [title]);

    useEffect(() => {
        if (titleRefCondensed.current) {
            const maxHeight = 20;
            adjustFontSizeToFit(titleRefCondensed.current, maxHeight);
        }
    }, [title]);

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

    //fix the text alignment issues with the condensed cards
    if (isCondensedView) {
        return (
            <Card
                sx={{
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out",
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
                    },
                    overflow: 'hidden',
                    width: '100%',
                    height: '190px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    '@media (max-width: 965px)': {
                        height: '180px',
                    },
                    '@media (max-width: 1273px)': {
                        height: '180px',
                    },
                    '@media (max-width: 1600px)': {
                        height: '190px',
                    },
                    '@media (max-width: 1920px)': {
                        height: '190px',
                    },
                }}
                onClick={onClick}
            >
                <CardContent
                    className="condensed-card-div"
                >
                    <div className="condensed-heart-icon-div">
                        <div className="condensed-icon-div">
                            <img src={imageIcon} alt="icon" style={{ width: 40, height: 40, borderRadius: '10%' }} />
                        </div>
                        <div className="condensed-heart-div">
                            <button
                                className="tileHeartIcon"
                                onClick={toggleLike}
                            >
                                <FontAwesomeIcon
                                    icon={liked ? faHeartSolid : faHeartRegular}
                                    color={liked ? 'red' : 'grey'} />
                            </button>
                        </div>
                    </div>
                    <div className="condensed-info-div">
                        <div className="condensed-card-title-div">
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                ref={titleRefCondensed}
                                sx={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: 'auto',
                                    color: 'text.primary',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }}>
                                {title}
                            </Typography>
                        </div>
                        <div className="condensed-card-body-div">
                            <div className="condensed-card-body-div-cat-year" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {year}
                                </Typography>
                                <Typography variant="body2" component="div" sx={getCategoryStyle(category)}>
                                    {category}
                                </Typography>
                            </div>
                            <div className="condensed-card-short-summary">
                                <Typography variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        width: '100%',
                                        '@media (max-width: 290px)': {
                                            marginBottom: '16px',
                                        },
                                    }}>
                                    {shortSummary}
                                </Typography>
                            </div>
                        </div>
                    </div>
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
                        width: 'auto',
                        height: '200px',
                        minHeight: '200px',
                    }}
                    image={image}
                    alt={title}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', top: '-46px', right: '12px' }}>
                    <button
                        className="tileHeartIcon"
                        onClick={toggleLike}
                    >
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
                    paddingTop: '0px',
                }}>
                    <div className="card-title-div">
                        <Typography
                            gutterBottom variant="h5"
                            component="div"
                            ref={titleRef}
                            sx={{
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 'auto',
                                color: 'text.primary',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                            }}>
                            {title}
                        </Typography>
                    </div>
                    <div className="card-body-div">
                        <div className="card-body-div-cat-year" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {year}
                            </Typography>
                            <Typography variant="body2" component="div" sx={getCategoryStyle(category)}>
                                {category}
                            </Typography>
                        </div>
                        <Typography variant="body2"
                            sx={{
                                color: 'text.primary',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                width: '100%',
                            }}>
                            {shortSummary}
                        </Typography>
                    </div>
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
