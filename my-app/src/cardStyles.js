// src/cardStyles.js
import { makeStyles } from '@mui/styles';

const CardStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '1rem',
    textAlign: 'center',
    // Add more styles here to match the design in the image
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  button: {
    marginTop: '0.5rem',
  },
  // Add other styles as needed
});

export default CardStyles;
