// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#40a2d8', //blue accent
        },
        //additional color here
    },
    //any other theme customization here
});

export default theme;