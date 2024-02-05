import React from 'react';
import Box from '@mui/material/Box';

const Tile = ({ title, category, content }) => (
    <Box m={2} p={2} boxShadow={3}>
        <h2>{title}</h2>
        <p>{category}</p>
        <div>{content}</div>
    </Box>
);

export default Tile;