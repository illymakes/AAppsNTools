import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TileCard = ({ title, image, year, category, content, darkMode }) => {
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
            display: 'flex',
            flexDirection: 'column',
        }}>
            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                    sx={{ width: '100%', objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                
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
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

TileCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    darkMode: PropTypes.bool,
};

export default TileCard;