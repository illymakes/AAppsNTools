import { Box, Modal, Typography, Button, Chip, IconButton, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

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

const Overlay = ({ open, onClose, data, darkMode }) => {
  if (!open) return null;

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

  const { imageIcon, title, category, description, link, tags, author, authorEmail, itemLogo } = data;

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
              <Typography id="modal-title" variant="h5" component="h2">{title}</Typography>
              <Typography id="modal-description" sx={getCategoryStyle(category)}>{category}</Typography>
            </Box>
          </Box>
          <img src={itemLogo} alt="logo" style={{ maxWidth: 100, maxHeight: 100, alignSelf: 'flex-start' }} />
        </Box>
        <Typography sx={{ mt: 2 }}>{description}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} href={link} target="_blank" rel="noopener">Go to Link</Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {tags?.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" />
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
    darkMode: PropTypes.bool,
  }),
};

export default Overlay;
