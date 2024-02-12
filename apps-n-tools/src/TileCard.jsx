import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TileCard = ({ title, image, year, category, content, darkMode }) => {
    const getCategoryStyle = (category) => {
        const colorsDarkMode = {
            books: '#FFA07A',
            movies: '#ADD8E6',
            videogames: '#90EE90',
            default: '#A9A9A9',
        };

        const colorsLightMode = {
            books: '#FF6347',
            movies: '#1E90FF',
            videogames: '#32CD32',
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
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
                <CardContent>
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
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    darkMode: PropTypes.bool,
};

export default TileCard;