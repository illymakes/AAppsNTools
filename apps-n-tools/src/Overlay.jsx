import { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, Chip, IconButton, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from './useFavorites';

const Overlay = ({ open, onClose, data, darkMode, setSearchQuery }) => {
  const { addFav, removeFav, isFavorited } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
      if (data) {
          const check = async () => {
              const isLiked = await isFavorited(data.title, data.category);
              setLiked(isLiked);
          };
          check();
      }
  }, [data, isFavorited]);

  const toggleLike = async () => {
      if (liked) {
          await removeFav(data.title, data.category);
      } else {
          await addFav({ id: data.title, category: data.category });
      }
      setLiked(!liked);
  };

  if (!open) return null;

  const button1Text = button1TextMapping[data.category.toLowerCase()] || 'Learn More'; // Default text if category is not found
  const button2Text = button2TextMapping[data.category.toLowerCase()] || 'Learn More'; // Default text if category is not found

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '80%',
    borderRadius: 2,
  };
  
  const button1TextMapping = {
    movies: 'View Website',
    books: 'View Website',
    'video games': 'View Website',
  };
  
  const button2TextMapping = {
    movies: 'Stream Here',
    books: 'Read Here',
    'video games': 'Play Here',
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

  const { imageIcon, title, category, description, tags, author, authorEmail, itemLogo, firstLink, secondLink } = data;
  const category1 = data.category.toLowerCase();
  const isValid1stLink = (firstLink) => firstLink && firstLink !== "-";
  const isValid2ndLink = (secondLink) => secondLink && secondLink !== "-";

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={imageIcon} alt="icon" style={{ width: 60, height: 60, borderRadius: '10%' }} />
            <Box>
              <Typography id="modal-title" variant="h5" component="h2">
                {title}
                <IconButton onClick={toggleLike} size="medium" sx={{ ml: 1.5 }}>
                  <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} color={liked ? 'red' : 'grey'} />
                </IconButton>
              </Typography>
              <Typography id="modal-description" sx={getCategoryStyle(category)}>
                {category}
              </Typography>
            </Box>
          </Box>
          <img src={itemLogo} alt="logo" style={{ maxWidth: 100, maxHeight: 100, alignSelf: 'flex-start' }} />
        </Box>
        <Typography sx={{ mt: 2 }}>{description}</Typography>
        {(category1 === 'video games' || category1 === 'movies') && isValid1stLink(firstLink) && (
          <Button variant="contained" sx={{ mt: 2, mr: 1 }} href={data.firstLink} target="_blank" rel="noopener">
            {button1Text}
          </Button>
        )}
        {isValid2ndLink(secondLink) && (
          <Button variant="contained" sx={{ mt: 2, mr: 1 }} href={data.secondLink} target="_blank" rel="noopener">
            {button2Text}
          </Button>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              onClick={() => {
                setSearchQuery(tag);
                onClose();
              }} />
          ))}
        </Box>
        <Typography sx={{ mt: 2 }}>
          Author: <Link href={`mailto:${authorEmail}`}>{author}</Link>
        </Typography>
      </Box>
    </Modal>
  );
};

Overlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.string,
    authorEmail: PropTypes.string,
    itemLogo: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Overlay;
