import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TileCard = ({ title, image, year, category, content }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}> {/* Added margin for visual separation */}
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image} // Matches the 'image' field in your JSON
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
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
  };

export default TileCard;