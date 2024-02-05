import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import the custom theme
import Tile from './components/Tile';
import Filter from './components/Filter';
import { Grid } from '@mui/material';
import CardComponent from './components/CardComponent'; // Adjust the path as needed
import CardStyles from './cardStyles'; // Adjust the path as needed

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ 'All': true });
  const categories = ['Books', 'Movies', 'Video Games'];
  const classes = CardStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = categories.map(category =>
          fetch(`./data/${category.toLowerCase()}.json`).then(response => response.json())
        );

        const data = await Promise.all(dataPromises);
        //flatten the array of arrays and set the tiles states
        setTiles(data.flat());
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedFilters(filters);
  };

  const filteredTiles = tiles
    .filter(tile => selectedFilters['All'] || selectedFilters[tile.category])
    .map((tile, index) => (
      <Grid item key={`${tile.category}-${tile.id}`} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Tile {...tile} />
      </Grid>
    ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures baseline styles are applied */}
      <div className={classes.app}>
        <Filter onFilterChange={handleFilterChange} categories={categories} />
        <Grid container spacing={2} justifyContent="center" className={classes.gridContainer}>
          {filteredTiles}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
